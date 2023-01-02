const express=require('express')
const app=express()
const PORT=3000

app.get('/',(req,res)=>{
    console.log(res)
    res.send(`<h1>Helloo from HTML!</h1>`)
    
})

app.get('/about',(req,res)=>{
    res.send('hellooooo nurse')

})

app.listen(PORT,()=>{

    console.log(`listening on http://localhost:${PORT}`)
})