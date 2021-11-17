const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
    //res.send('You have views this page x times')
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewes this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const {username = 'Anonymous'} = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const {username} = req.session;
    res.send(`Welcome back, ${username}!`)
})

app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})