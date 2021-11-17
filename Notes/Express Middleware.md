# Intro

- Express middleware ae functions that run during the request/response lifecycle: `Request ---> Middleware ---> response`
- Middleware are just functions
- each middleware has access to the request and response objects
- middleware can end the HTTP request by sending back a response with methods like `res.send()` OR can be chained together, one after another by calling `next()`
- Express is a routing and middleware web framework that has minimal functionallity of its own: 
    - An Express application is essentially a series of middleware function calls
- Middleware functions are functions that have access to the request `object(req)`, the response `object(res)` and the next middleware function in the application's request-response cycle
- The next middleware function is commonly denoted by a variable named next
- middleware functions can perform the following tasks:
    - execute any code
    - make changes to the request and the response objects
    - end the request-response cycle
    - call the next middleware function in the stack


# Morgan - Logger Middleware

- HTTP request logger middleware for node.js
- documentation: [Morgan](http://expressjs.com/en/resources/middleware/morgan.html)
- we install it by using `npm install morgan`
- example:
```js
    //index.js
    const express = require('express');
    const app = express();
    const morgan = require('morgan');

    app.use(morgan('tiny'))

    app.get('/', (req, res) => {
        res.send('Home Page!')
    })

    app.get('/dogs', (req, res) => {
        res.send('Woof Woof!')
    })

    app.listen(3000, () => {
        console.log('App is running on localhost:3000')
    })

    - on the console we will get every request made:
    $ nodemon index.js
    [nodemon] starting `node index.js`
    App is running on localhost:3000
    GET / 304 - - 18.753 ms
    GET /dogs 200 10 - 0.835 ms
    GET /dcdssds 404 146 - 1.376 ms  
```

# Defining Our Own Middleware

- documentation: [Writing Middleware](http://expressjs.com/en/guide/writing-middleware.html)
```js
    //index.js
        app.use((req, res, next) => {               //<-- this function runs on every single request
        console.log('This is my first middleware!')
        next();                                     //<-- without this line, we don't get a response
    })

    //on the console:
    [nodemon] starting `node index.js`
    App is running on localhost:3000
    This is my first middleware!
    GET /dogs 304 - - 20.863 ms
```
- to make sure there is no code run after `next()`, we can return it: `return next();`
```js
    //index.js
    app.use((req, res, next) => {
        req.requestTime = Date.now();
        console.log(req.method.toUpperCase(), req.path);
        next();
    })
    
    app.get('/', (req, res) => {
        console.log(`Request Date: ${req.requestTime}`)
        res.send('Home Page!')
    })
```
```
    //on the console:
    nodemon] starting `node index.js`
    App is running on localhost:3000
    GET /
    Request Date: 1624203180824
    GET / 304 - - 32.688 ms         <-- from morgan
```
- for `app.use` we can also pass in a string for a path to match: http://expressjs.com/en/4x/api.html#app.use
```js
    app.use('/dogs', (req, res, next) => {
        console.log('I love dogs')
        next();
    })
```
- if nothing else was matched, we set up a 404 route:
```js
    //we put this at the end of the app; this will only run if we never send back anything before (if we never ended the cycle)
    app.use((req, res) => {
        res.status(404).send('NOT FOUND!')      //<--- res.status allows us to first change the status code
    })
```

- password middleware Demo (not real auth):
```js
    //index.js
    app.use((req, res, next) => {
        const {password} = req.query;
        if(password === 'chickennugget') {          //<--- every path needs to have a password query set to chickennugget
            next();
        }
        res.send('Sorry, you need a password')
    })
```
- protecting specific routes:
    - by using `app.get`, we can pass multiple callbacks functions that behave just like middleware
    - documentation: http://expressjs.com/en/4x/api.html#app.get.method
```js
    //index.js
    const verifyPassword = (req, res, next) => {
        const {password} = req.query;
        if(password === 'chickennugget') {
            next();
        }
        res.send('Sorry, you need a password')
    }
    
    app.get('/secret', verifyPassword, (req, res) => {
        res.send('My Secret is: I want to sleep')
    })
```