
console.log('notesjs is connected')
const noteTitle=document.querySelector('input.note-title')
console.log(noteTitle)
const noteInput=document.querySelector('textarea') 
console.log(noteInput)
const addButton=document.querySelector('i.fa-plus')
console.log(addButton)
const existingNotes=document.querySelector('div.card')
console.log(existingNotes)
// const trashButton=document.querySelector('bi-trash')
// console.log(trashButton)
// const ageInput=document.querySelector('[name="age"]')

// const typeInput=document.querySelector('[name="type"]')

const renderNotes=(notes)=>{
    console.log(notes)  //shows an array of the notews
    existingNotes.innerHTML=''
    console.log(existingNotes.innerHTML)    //is empty on console.log but data persits on page
    notes.forEach(note=>{
        const li=document.createElement('li')
        // add the id of each button 5 lines down with button data-id="${note.id}"
        // <div class="card">
        // <button data-id="${note.id}"><i class="bi bi-trash"></i></button>
        console.log(note)
        console.log(`${note.title}`)
        console.log(`${note.noteText}`)
        console.log(`${note.id}`)
        li.innerHTML=`
        <h3>${note.title}</h3>
        <p>${note.noteText}</p>
        <i class="bi bi-trash" data-id="${note.id}" value="trash"></i>
        </div>
        `
        existingNotes.appendChild(li)
    })
}
/////////////////////////////////////
//add event listener to the parent to detect clicks on children to delete selected data
existingNotes.addEventListener('click',event=>{
    console.log(event.target)
    //is the event.target a button?
    console.log(event.target)
  
    if(event.target.matches('trash')){
     console.log('matches')
        // data-id is a property on the object you can select
        console.log(event.target.data-id)
        const id=event.target.data-id
        console.log(id)  //use this value to identify data to be deleted-now need a route in server
        //NOW CODE IN FRONT END INDEX.JS so front end code sends the ID to the delete route
        fetch(`/api/db/${id}`,{
            method:'DELETE'     //this changes the default rout from get to delete
        })
        .then(response=>response.json())
        //rerun the fetch code to re render the animals
        .then(()=>getAllNotes())
        .catch(error=>console.log(error))
    }
})

///////////////////////////////////////
function handleSubmit(event){
    console.log(event)       //works
    event.preventDefault()
    console.log(noteTitle.value)//works
    console.log(noteInput.value)
   

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
    