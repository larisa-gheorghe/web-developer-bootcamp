const express = require("express");
const app = express()

//app.use((req, res) => {
//    console.log("We got a new request")
    //res.send("Hello, we got your request. This is a response")
    //res.send({color: 'red' })
//    res.send('<h1>This is my webpage</h1>')
//})
app.get('/',(req, res) => {
    res.send('This is the home page!')
})
app.get('/cats',(req, res) => {
    res.send('MEOW!')
})
app.get('/dogs', (req, res) => {
    res.send('Woof!')
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})

