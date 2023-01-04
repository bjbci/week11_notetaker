const path = require('path')
const express=require('express')
// const { resourceLimits } = require('worker_threads')-- what is this-I didnt put it here
const app=express()
const PORT=3000

app.use(express.static('public'))  //allows public folder to be unblocked.browser can now request reso9urces from that-public- folder

console.log(__dirname)
/////////  OBSOLETE
// app.get('/',(req,res)=>{
//     // console.log(res)
//     res.sendFile(__dirname+'/develop/public/index.html')
    
// })

// app.get('/notes',(req,res)=>{
//     res.sendFile(__dirname+'/develop/public/notes.html')

// })

app.get('/',(req,res)=>{
    // console.log(res)
    res.sendFile(path.join(__dirname,'develop','public','index.html'))
    
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'develop','public','notes.html'))

})
//////////////////  THIS IS REAL////////////////////////UP UP UP UP
////////// MIGHT NEED THIS
// const terms=require('./terms.json')
// app.get('/api/terms',(req,res)=>{
//     res.json(terms)
// })
///////////////////////
// query parameters  search for something with querie parameters
//localhost:3000/api/animals?age=old&sort=DESC  --console.log(req)
/////////////////////////
//const animalData=require('./animals.json)   --an animals.json file holding data
// app.get('/api/animals',(req,res)=>{
//    console.log(req.query)

//let result =animalData
//if(req.query.age){
    // if(req.query.age==='old'){
    //     result=animalData.filter(animal=>animal.age>10)
    // }
    // if(req.query.age==='young'){
    //     result=animalData.filter(animal=>animal.age<=10)
//}   
// }
//     res.json(result)
// })
///////////////////////////////////////////////
// api route to search for type of something by passing in 
//a value in url eg xxx.api/animal/turtle   --in URL parameter
//will search for whatever is in the dynamic part of the URL
// --an animals.json file holding data
// const animalData=require('./animals.json)
// // --the : creates a url parameter if you need a dynamic varible 
//  app.get('/api/animal/:animalType',(req,res)=>{     
//    console.log(req.params)
// const result=animalData.filter(animal=>animal.type===req.params.animalType)
//  if(results.length===0){
//      return res.status(404).send(`${req.params.animalType} not found`)
//  }
// res.json(results)
// })

//////////////////////////////////////////////
//  How to access data in the fron end  --add in index.html


app.listen(PORT,()=>{

    console.log(`listening on http://localhost:${PORT}`)
})