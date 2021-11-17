const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

app.use(morgan('tiny'))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method.toUpperCase(), req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I love dogs')
    next();
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if(password === 'chickennugget') {
        next();
    }
    throw new AppError('password required', 401);
    //res.send('Sorry, you need a password')
    //throw new AppError('Password required!', 401)
}

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Home Page!')
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`)
    res.send('Woof Woof!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret is: I want to sleep')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403)
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})