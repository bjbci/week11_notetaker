
console.log('notesjs is connected')
const noteTitle=document.querySelector('input.note-title')
console.log(noteTitle)
const noteInput=document.querySelector('textarea') 
console.log(noteInput)
const addButton=document.querySelector('i.fa-plus')
console.log(addButton)
// const ageInput=document.querySelector('[name="age"]')

// const typeInput=document.querySelector('[name="type"]')

function handleSubmit(event){
    console.log(event)
    event.preventDefault()
    console.log(noteTitle.value)

    const newNote={
        // name:nameInput.value,
        // // age:parseInt(ageInput.value),
        // type:typeInput.value,
        title:noteTitle.value,
        noteText: noteInput.value,

    }
    console.log(newNote)


    fetch('api/db',{
        method:'POST',      //posts to app.post('api/db')
        headers: {          //which then responds at the .then
         "Content-Type":"application/json"   
        },
        body:JSON.stringify(newNote)
    })
    .then(response=>response.json())
    // .then(animal=>console.log(animal))
    .then(db=>{
        window.location.href='/'    //relocates user to home screen after data submit pressed
    })
    .catch(error=>console.log(error))
    }
    
    addButton.addEventListener('click',handleSubmit)
    