
console.log('notesjs is connected')
const noteTitle=document.querySelector('input.note-title')
console.log(noteTitle)
const noteInput=document.querySelector('textarea') 
console.log(noteInput)
const addButton=document.querySelector('i.fa-plus')
console.log(addButton)
const existingNotes=document.querySelector('div.card')
console.log(existingNotes)
// const ageInput=document.querySelector('[name="age"]')

// const typeInput=document.querySelector('[name="type"]')

const renderNotes=(notes)=>{
    console.log(notes)  //shows an array of the notews
    existingNotes.innerHTML=''
    notes.forEach(note=>{
        const li=document.createElement('li')
        // add the id of each button 5 lines down with button data-id="${note.id}"
        li.innerHTML=`
        <div class="card">
        <h2>${note.title}</h2>
        <p>${note.text}</p>
        <button data-id="${note.id}">X</button>
        </div>
        `
        existingNotes.appendChild(li)
    })
}


function handleSubmit(event){
    console.log(event)       //works
    event.preventDefault()
    console.log(noteTitle.value)//works

    const newNote={
        // name:nameInput.value,
        // // age:parseInt(ageInput.value),
        // type:typeInput.value,
        title:noteTitle.value,
        noteText: noteInput.value,
        // id:instance(),
    }
    console.log(newNote)   //works


    fetch('api/db',{
        method:'POST',      //posts to app.post('api/db')
        headers: {          //which then responds at the .then
         "Content-Type":"application/json"   
        },
        body:JSON.stringify(newNote)
    })
    .then(response=>response.json())
    // .then(animal=>console.log(animal))
    // .then(db=>{
    //     window.location.href='/'    //relocates user to home screen after data submit pressed
    // })
    .catch(error=>console.log(error))
    }
    
    function getAllNotes(){
        //fetch all notes on page load- need a get route in server.js
        fetch('api/db')   //fetch is a get request
        .then(response=>response.json())
        .then(notes=>renderNotes(notes))
        .catch(err=>console.log(err))
        
        }
        
        getAllNotes() 

    addButton.addEventListener('click',handleSubmit)
    