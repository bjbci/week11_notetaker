const express = require("express");
const path = require("path");
const fs = require("fs");
const hyperid = require("hyperid");
const instance = hyperid();

const shortid = require("shortid");

// import { nanoid } from 'nanoid'  //model.id = nanoid()   nanoid(10)
// const { resourceLimits } = require('worker_threads')-- what is this-I didnt put it here
const app = express();
const PORT = 3000;
const noteData = require("./db.json"); //pulls in data from database

app.use(express.static("public")); //allows public folder to be unblocked.browser can now request resources from that-public- folder
app.use(express.json()); //  this parses the body on the request into json data for you

//view /html routes
//home page path and note page path
app.get("/", (req, res) => {
  // console.log(res)
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
////////////////////////////////////////////////////////////////////

// load all notes on page load of notes page by sending back json data
app.get("/api/notes", (req, res) => {
  //TO DO READ DB.JSON CONTENTS
  fs.readFile(path.join(__dirname, "db.json"), "utf-8", function (err, data) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    //if you get contents out of readFIle parse it into json
    console.log(JSON.parse(data));
    const json = JSON.parse(data);
    //RESpond with THE PARSED ARRAY
    res.json(json);
  });
});
////////////////////////////////////////////////////////////////

app.post("/api/notes", (req, res) => {
  const noteMade = createNote(req.body, noteData);
  res.json(noteMade);
});

const createNote = (body, noteData) => {
  const newNote = body;
  body.id = instance();
  noteData.push(newNote);
  fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(noteData));
  console.log(body.id);
  return newNote;
};

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

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, noteData);
  res.json(true);
});

const deleteNote = (id, noteData) => {
  for (let i = 0; i < noteData.length; i++) {
    let note = noteData[i];
    if (note.id == id) {
      noteData.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "db.json"),
        JSON.stringify(noteData)
      );
      break;
    }
  }
};

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
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
