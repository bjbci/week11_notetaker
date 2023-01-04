const express=require('express')
const path = require('path')
const fs=require('fs')
// const { resourceLimits } = require('worker_threads')-- what is this-I didnt put it here
const app=express()
const PORT=3000
const animalData=require('./db.json') //pulls in data from database

app.use(express.static('public'))  //allows public folder to be unblocked.browser can now request resources from that-public- folder
app.use(express.json())//  this parses the body on the request into json data for you


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
    const {title,noteText}=req.body    //req.body is the data for a new animal-is an objest
    // console.log('hit the animals POST route',req)
    // console.log(req.body)
    // if(!req.body.name ||req.body.age ||req.body.type){
        if(!title||!noteText){
    res.status(400).json({error:'title or content'})
    return
    }
    //newAnimal object with take on all the key value pairs from req.body by using spread operator ...
    const newNote={  
       ...req.body,
       id: Math.random()        //id will be a new key value on new animal object
    }
    //push this data into an array-THE NEXT TWO LINES WONT MAKE DATA PERSIST:
// animalData.push(newAnimal)
// res.json(newAnimal)

//MAKE DATA PERSIST:  
//READ CONTENTS OF ANIMALS.JSON
fs.readFile(path.join(__dirname, "db.json"),"utf-8", function(err,data){
if (err){
    res.status(500).json(err)
    return
    }
//PARSE STRING INTO JSON
const noteData=JSON.parse(data)
//PUSH OUR NEW ANIMAL INTO JSON
noteData.push(newNote)
//STRINGIFY ANIMALS ARRAY AND SAVE FILE
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


//////////////////////////////////////////////////////////////

// --the : creates a url parameter if you need a dynamic varible 
app.get('/api/animals/:animalType',(req,res)=>{     
    //    console.log(req.params)
    const results=animalData.filter(animal=>animal.type===req.params.animalType)
     if(results.length===0){
         return res.status(404).send(`${req.params.animalType} not found`)
     }
    res.json(results)
    })
//////////////////////////////////////////////////////////////
app.listen(PORT,()=>{

    console.log(`listening on http://localhost:${PORT}`)
})