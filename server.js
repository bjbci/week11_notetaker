const express=require('express')
const path = require('path')
const fs=require('fs')
const hyperid = require('hyperid')
const instance = hyperid()

const shortid = require('shortid');


// import { nanoid } from 'nanoid'  //model.id = nanoid()   nanoid(10)
// const { resourceLimits } = require('worker_threads')-- what is this-I didnt put it here
const app=express()
const PORT=3000
const noteData=require('./db.json') //pulls in data from database

app.use(express.static('public'))  //allows public folder to be unblocked.browser can now request resources from that-public- folder
app.use(express.json())//  this parses the body on the request into json data for you


//view /html routes
//home page path and note page path
app.get('/',(req,res)=>{
    // console.log(res)
    res.sendFile(path.join(__dirname,'public','index.html'))
    
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','notes.html'))

})
////////////////////////////////////////////////////////////////////

// load all notes on page load of notes page by sending back json data
app.get('/api/db',(req,res)=>{
    //TO DO READ DB.JSON CONTENTS 
    fs.readFile(path.join(__dirname,"db.json"),'utf-8',function(err,data){
        if (err){
            res.status(500).json(err)
            return
        }
        //if you get contents out of readFIle parse it into json
         console.log(JSON.parse(data))
        const json=JSON.parse(data)
        //RESpond with THE PARSED ARRAY
        res.json(json)
    })
    })
////////////////////////////////////////////////////////////////

app.post('/api/db',(req,res)=>{
    const {title,noteText}=req.body    //req.body is the data for a new note-is an objest
    // console.log('hit the db POST route',req)
    // console.log(req.body)
    // if(!req.body.title ||req.body.noteText){
        if(!title||!noteText){
    res.status(400).json({error:'title or content'})
    return
    }
    //newAnimal object with take on all the key value pairs from req.body by using spread operator ...
    const newNote={  
       ...req.body,
    //    id: instance(),      //instance()id will be a new key value on new note object
        id:instance(),
    }
    console.log(newNote)
    //push this data into an array-THE NEXT TWO LINES WONT MAKE DATA PERSIST:
// noteData.push(newNote)
// res.json(newNotel)

//MAKE DATA PERSIST:  
//READ CONTENTS OF DB.JSON
fs.readFile(path.join(__dirname, "db.json"),"utf-8", function(err,data){
if (err){
    res.status(500).json(err)
    return
    }
//PARSE STRING INTO JSON
const noteData=JSON.parse(data)
//PUSH OUR NEW NOTE INTO JSON
noteData.push(newNote)
//STRINGIFY db ARRAY AND SAVE FILE
fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(noteData),function(err){
    if(err){
        res.status(500).json(err)
        return
    }
    res.status(200).json(newNote)
})
})
})
///////////////////////////////////////////////////////////////
// app.get('/api/db/:id',(req,res)=>{
//     const animalType=req.params.id
// // console.log(req.params.animalType)
// const pattern=/[a-z]/g
// if (!pattern.test(animalType)){
//     res.status(400).json({error:'not a valid daata type'})
//     return
// }
// //TO DO READ ANIMALS.JSON CONTENTS
// fs.readFile(path.join(__dirname,"db.json"),'utf-8', function(err,data){
    
//     if(err){
//         res.status(500).json(err)
//         return
//     }
//     const noteData=JSON.parse(data)
//     const results=noteData.filter(animal=> animal.type===animalType)
    
//     if(results.length===0){
//         res.status(404)
//     }
//     //RES.JSON THE PARSED ARRAY
// res.json(results)
// })
// })
/////////////////////////////////////////////////////////

app.delete('/api/db/:id',(req,res)=>{
    console.log('delete route hit')
    const id =req.params.id
    
    if(!id){
        res.status(400).json({error:"we need an id"})
        return
    }
    //the process to actually delete:read the json file,modify the contents,stringify contents and resave the contents
    fs.readFile(path.join(__dirname,"db.json"),'utf-8',function(error,data){
        const noteData=JSON.parse(data)
    console.log(noteData)
    //return an array of all objects EXXCEPT the one you chose which will be deleted with .filter
    const updatedNoteData=noteData.filter(note=> id !=note.id)
    console.log(updatedNoteData)
    fs.writeFile(path.join(__dirname,"db.json"),JSON.stringify(updatedNoteData),function(error){
        if(error){
    
        return res.status(500).json(error)
    }
    res.json(true)
    })
    })
    console.log('delete route hit')      //NOW CODE IN FRONT END INDEX>JS so front end code sends the ID to the delete route
})

//////////////////////////////////////////////////////////////

// // --the : creates a url parameter if you need a dynamic varible 
// app.get('/api/animals/:animalType',(req,res)=>{     
//     //    console.log(req.params)
//     const results=noteData.filter(animal=>animal.type===req.params.animalType)
//      if(results.length===0){
//          return res.status(404).send(`${req.params.animalType} not found`)
//      }
//     res.json(results)
//     })
//////////////////////////////////////////////////////////////
app.listen(PORT,()=>{

    console.log(`listening on http://localhost:${PORT}`)
})