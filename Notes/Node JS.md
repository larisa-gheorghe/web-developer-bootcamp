# Introduction

- until recently, we could only run JS code in a web browser. 
- Node is a JS runtime that executes code outside of the browser
- we can use the same JS syntax we know to write server-side code, instead of relying on other languages like Python or Ruby.
- it can be built with: web servers, command line tools, Native Apps(VSCode), Video Games, Drone Software etc
- docs: [NodeJS Docs](https://nodejs.org/dist/latest-v14.x/docs/api/)

# The Node REPL

- REPL - Read Evaluate Print Loop
- we need to type 'node' in the cmd line to enter Node REPL
- because Node does not run in a browser, we don't have access to all the browser stuff, like the window, document, DOM API's
- Node comes with a bunch of built-in modules that don't exist in the browser
- these modules help us do things like interact with the OS and files/folders
- the global scope in Node is called `global`
```
        > global
        <ref *1> Object [global] {
          global: [Circular *1],
          clearInterval: [Function: clearInterval],
          clearTimeout: [Function: clearTimeout],
          setInterval: [Function: setInterval],
          setTimeout: [Function: setTimeout] {
            [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
          },
          queueMicrotask: [Function: queueMicrotask],
          clearImmediate: [Function: clearImmediate],
          setImmediate: [Function: setImmediate] {
            [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
          }
        }

        > setTimeout(() => console.log("HELLO!"), 3000)
        Timeout {
          _idleTimeout: 3000,
          _idlePrev: [TimersList],
          _idleNext: [TimersList],
          _idleStart: 605199,
          _onTimeout: [Function (anonymous)],
          _timerArgs: undefined,
          _repeat: null,
          _destroyed: false,
          [Symbol(refed)]: true,
          [Symbol(kHasPrimitive)]: false,
          [Symbol(asyncId)]: 395,
          [Symbol(triggerId)]: 5
        }
        > HELLO!
```

# Running Node Files
```
$ touch firstScript.js

$ cat firstScript.js
for(let i = 0; i < 10; i++){
    console.log("Hello from first script!")
}

$ node firstScript.js
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
Hello from first script!
```

# Process & Argv

- documentation: [Process](https://nodejs.org/dist/latest-v14.x/docs/api/process.html)
- the `process` object is a global that provides information about, and control over, the current Node.js process. 
- as a global, it is always available to Node.js applications without using `require()`.
- it can also be explicitly accessed using `require()`:
```
        const process = require('process');

        > process.version
        'v14.16.0'

        > process.release
        {
          name: 'node',
          lts: 'Fermium',
          sourceUrl: 'https://nodejs.org/download/release/v14.16.0/node-v14.16.0.tar.gz',
          headersUrl: 'https://nodejs.org/download/release/v14.16.0/node-v14.16.0-headers.tar.gz',
          libUrl: 'https://nodejs.org/download/release/v14.16.0/win-x64/node.lib'
        }

        > process.cwd()
        'C:\\Users\\lcgheorg\\Documents\\Web Developer Bootcamp\\Backend'
```
- The `process.argv` property returns an array containing the command-line arguments passed when the Node.js process was launched. 
- The first element will be `process.execPath`. 
- The second element will be the path to the JavaScript file being executed. 
- The remaining elements will be any additional command-line arguments.
```
        $ node
        > process.argv
        [ 'C:\\Program Files\\nodejs\\node.exe' ]   //an array that contains a string

        $ touch args.js

        $ cat args.js
        console.log("Hello from ARGS file!")
        console.log(process.argv)

        $ node args.js
        Hello from ARGS file!
        [
          'C:\\Program Files\\nodejs\\node.exe',                                // the executable path
          'C:\\Users\\lcgheorg\\Documents\\Web Developer Bootcamp\\Backend\\args.js'       // the path to the file args.js
        ]

        $ node args.js puppies hello
        Hello from ARGS file!
        [
          'C:\\Program Files\\nodejs\\node.exe',
          'C:\\Users\\lcgheorg\\Documents\\Web Developer Bootcamp\\Backend\\args.js',
          'puppies',
          'hello'
        ]
```
- other example:
```
        $ touch greeter.js

        $ cat greeter.js
        const args = process.argv.slice(2);
        for(let arg of args){
            console.log(`Hello ${arg}!`)
        }

        $ node greeter.js Susie Sam
        Hello Susie!
        Hello Sam!
```

# Process & Argv[2]

- `fs.mkdir(path[, options], callback)` - asynchronously creates a directory
```js
const fs = require('fs');   //we first need to require it in order to use the module.

        fs.mkdir('Dogs', { recursive: true }, (err) => {
            console.log("In the callback")
            if (err) throw err;
          });
        console.log("I come after mkdir in the file");
```
- `fs.mkdirSync(path[, options])` - Synchronously creates a directory. 
    - Returns undefined, or if recursive is true, the first directory path created.
```js
        fs.mkdirSync('Cats');
        console.log("I come after mkdir in the file");
```
- `fs.writeFileSync(file, data[, options])`
```js
        const fs = require('fs');
        const folderName = process.argv[2] || 'Project'

        try {
            fs.mkdirSync(folderName);
            fs.writeFileSync(`${folderName}/index.html`,'')
            fs.writeFileSync(`${folderName}/app.js`,'')
            fs.writeFileSync(`${folderName}/style.css`,'')
        } catch (e) {
            console.log('Something went wrong');
            console.log(e);
        }
```

# module.exports

- if we require a file in another file without using the module.exports object, we get an empty object ( this is what gets exported)
- using module.exports we explicitly say what we want to export
```js
      //file 1
      const add = (x,y) => x + y;
      const PI = 3.14159;
      //module.exports = "HELLO"
      module.exports.add = add;
      module.exports.PI = PI;

      //file 2
      const math = require('./math');
      console.log(math)     //we get an object {add: [Function: add], PI: 3.14159}
      console.log(math.add)
```
- a shortcut syntax for `module.exports` is:
```js
      //file 1
      const add = (x,y) => x + y;
      const PI = 3.14159;
      exports.add = add;
      exports.PI = PI;
```
- we can also require an entire directory
```
      > mkdir shelter
      > cd shelter
      > touch blue.js sadie.js
      > touch index.js      //node is going to look for an index file; what this file exports is what the directory will export
```
```js
      //file blue.js
      module.exports = {
        name: 'blue',
        color: 'grey'
      }

      //file sadie.js
      module.exports = {
        name: 'sadie',
        color: 'black'
      }

      //file index.js
      const blue = require('./blue')
      const sadie = require('./sadie')

      const allCats = [blue, sadie]
      console.log(allCats);     // when we run 'node index.js' we get an array with 2 objects

      module.exports = allCats;
```
```
      > cd ..   //out of shelter directory
      > touch app.js
```
```js
      //file app.js
      const add = (x,y) => x + y;
      const PI = 3.14159;

      const cats = require('./shelter')
      console.log(cats);     // when we run 'node app.js' we get an array with 2 objects
```
      
# Node Package Manager

- NPM is a library of thousands of packages published by other developers that we can use for free
- NPM is a command line tool to easily install and manage those packages in out Node projects
- installing packages locally to a specific directory: `> npm install <package_name>`
- after the package is installed, we can see some files created.
- we need to create another file, index.js to require that specific package
```
      > npm install give-me-a-jokes
      >touch index.js
```
```js
      //index.js
      const jokes = require("give-me-a-joke")
      console.dir(jokes)
```
```
      > node index.js
      {
        getRandomCNJoke: [Function],
        getCustomJoke: [Function],
        getRandomDadJoke: [Function],
        getRandomJokeOfTheDay: [Function]
      }
```
```js
      //modifying index.js
      const jokes = require("give-me-a-joke")
      jokes.getRandomDadJoke(function (joke){
        => console.log(joke);
      });
```

# Adding Global Packages

- we use the `-g` option: `npm install -g <package_name>`
- this will try to add to `/usr/local/lib/node_modules` (the highest level of my machine)
- in case we don't have permissions we need to run: `sudo chown -R $USER /usr/local/lib/node_modules`
- to have access to the global packages we have to link them: `> npm link <global_package>`   <---- now we can use them in index.js file


# Package.json

- it contains metadata about a particulat package or project.
- it's not required, but it's recommended
- we need to use an npm command to create this file: `> npm init`    <-- this utility will walk you through creating a `package.json` file
- then we can install the package without any warning
- if we want to install a package from another system and we have the package.json file, we can run: `> npm install`       <-- with nothing after
- this command it's going to lock at package.json and install all dependencies
- after running this command, a node_modules folder will appear


# Express

- is a fast, unopinionated, minimalist web framework for Node.js
- it helps us build web Apps
- it's an NPM package which comes with a bunch of methods and optional plugins that we can use to build web applications and API's
- express helps us  
    - start up a server to listen for requests
    - parse incoming requests
    - match those requests to particulat routes
    - craft out http response and associated content
- libraries vs frameworks:  
    - when you use a library, you are in charge; 
    - you control the flow of the application code and you decide when to use the library
    - with frameforks, that control is inverted.
    - the framework is in charge, and you are merely a participant.
    - the framework tells you whereto plug in the code.


# First Express App

- documentation: 
    - [ExpressJS](https://expressjs.com/)
    - [Express API](https://expressjs.com/en/4x/api.html#req)
```
$ npm init -y
Wrote to /home/larisa/Documents/Express/FirstApp/package.json:
{
  "name": "FirstApp",                     <--- the name shouldn't contain capital letters
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

$ npm init -y
$ touch index.js

$ vi index.js
const express = require("express");
const app = express()
console.dir(app)
```
```js
// $ cat index.js 
const express = require("express");
const app = express()
app.use((req, res) => {                     //<--- We use request & response Objects
    console.log("We got a new request")
    //res.send("Hello")                     // <--- Sends the HTTP response
    //res.send({color: 'red' })             // <--- will be transformed in json format
    res.send('<h1>This is my webpage</h1>')   // <--- we can use html
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```
- then we go to: http://localhost:3000/
- on the terminal we will get the console log message every time we access http://localhost:3000/
- we can use `nodemon` package for auto-restart the server: `nodemon index.js`

# Express Routing Basics

- routing: taking incomming requests and a path that is requested and matching that to some code and some response (i.e: localhost:8080/dogs)
- we can add routes using methods for app that we created earlier: `app.get`
- request is an object created by express based upon the incomming http request
- response is an object created by express and has a bunch of methods, including `res.send`, which we use to send back content
```js
$ cat index.js 
const express = require("express");
const app = express()
//app.use((req, res) => {                  
//    console.log("We got a new request")
//    res.send("Hello")                 // <--- if we use this we get only one response, therefore we need to comment these lines
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
app.get('*', (req, res) => {        // <--- * means everything else; it's important to put it at the end!!!
    res.sed(`I don't know that path`)
})
app.post('/cats', (req, res) => {
    res.sed('Post request to /cats! This is different than a get request')
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```

# Express Path Parameters

- we define a pattern, not an exact match
```js
app.get('/r/:subreddit',(req, res) => {         //<--- we use ':' for pattern matching
  console.log(req.params);                       // { subreddit: 'cats'}
  const {subreddit} = req.params;               //<--- deconstruct
  res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)    //Browsing the cats subreddit
})

app.get('/r/:subreddit/:postId',(req, res) => { 
  const {subreddit, postId} = req.params;
  res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})
```

# Query Strings

- req.query
- the req object has a property called query; In that property we'll find key-value pairs based upon the query string
```js
app.get('/search', (req, res) => {
  const {q} = req.query;
  if (!q) {
    res.send(`Nothing found if nothing searched`)
  }
  res.send(`<h1>Search results for: ${q}</h1>`)    // <--- localhost:3000/search?q=cat&color=green
})
```

# Templating 

- templating allows us to define a preset "pattern" for a webpage, that we can dynamically modify
- i.e we could define a single "Search" template that displays all the results for a given search term;
    - we don't know what the term is or how many results there are ahead of time. The webpage is created on the fly
- EJS = Embedded JavaScript templating - to add logic into our templates
    - it uses plain JavaScript, you don;t have to learn a different syntax
- Handlebars, Pug, Nunjucks can also be used; they have different syntax
- there is a particular method on the app, called `app.set(name, value)` which assigns setting name to value
- certain names can be used to configure the behavior of the server.
```
$ npm init -y
$ npm i express
$ npm i ejs
$ touch index.js
```
```js
// $ cat index.js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');    //<--- we don't need to require ejs in this file; 
                                  // by setting 'view engine' to 'ejs', express behind the scene will require the package for us

app.get('/', (req, res) => {
    res.send("Hi")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```
- by default, when we create a new express app and we are using some 'view engine', express is going to assume that our views are templates that exist in a directory called views. So we need to create that file
```
$ mkdir views
$ touch views/home.ejs    <--- we can write html
```
- we can use `res.render` to render a view and send the rendered HTML string to the client
  `res.render('home.ejs')`      
    - we don't need to specify the full path, because the default is views/home.ejs
    - we don't have to specify the extension `.ejs`, because of the line: `app.set('view engine', 'ejs');`
    - if we have JavaScript in the file, it will transform it into HTML
```js
// $ cat index.js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```
- if we want to start our server from a different directory, we need to change the views directory:
```
$ pwd
/home/larisa/Documents
$ nodemon Templating_Demo/index.js    <--- we will get an error:
      Failed to lookup view "home.ejs" in views directory "/home/larisa/Documents/views"

$ node
> process.cwd()
'/home/larisa/Documents'    <--- it's the current dir I'm currently in; it appends /views/home.ejs to that and it's not correct
```
- for this we can add the following: `app.set('views')`
```js
// $ cat index.js
const express = require('express');
const app = express();
const path = require('path');          //<--- we need to require path

app.set('view engine', 'ejs');
app.set('views', path.join(_dirname, '/views'))       //<--- taking our current dir name where this file is located and joining that path with /views

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```

# EJS Interpolation Syntax

- documentation: [EJS](https://ejs.co/)
- tags: `<%= %>`    <--- whatever we put here, it's gonna be treated as JS
- i.e:
```
    <%= 1 + 2 + 3 %>
    <%='hello.world'.toUpperCase() %>
```

# Passing Data to Templates

- we can add JS in the ejs file: `<h1>Your random number is <%= Math.floor(Math.random() * 10) + 1%> </h1>`
- or we can add it in the index.js file:
```js
      app.get('/rand', (req, res) => {
          const num = Math.floor(Math.random() * 10) + 1
          res.render('random', {rand: num})         //<--- we can pass a second argument.
                                                    //<--- this will be an object (key-value pairs)
                                                    //<--- 'num' will be available in our template under the name 'rand'
```
- the ejs file now looks as following: `<%= rand %> </h1>`    <--- we have access to a variable called 'rand'
- if the `key:value` pair is the same, the syntax can look like below:
```js
      app.get('/rand', (req, res) => {
          const num = Math.floor(Math.random() * 10) + 1
          res.render('random', {num})         <--- which means num:num
```
- another example:
```js
      //index.js
      app.get('/r/:subreddit', (req, res) => {
          const {subreddit} = req.params;         //<--- destructure it
          res.render('subreddit', {subreddit})
      })

      //subreddit.ejs
      <title><%= subreddit %> </title>
      </head>
      <body>
          <h1>Browsing the <%= subreddit %> subreddit</h1>
      </body>
```

# Conditionals in EJS

- tag `<% %>` = will allow us to embedd JS without the results actually being added into the template
    - we can add JS logic without having anything actually be rendered as a result of this one tag
- i.e:
```html
      <body>
          <h1>Your random number is <%= num %> </h1>
          <% if(num % 2 === 0){ %> 
              <h2>That is an even number</h2>
          <% } else { %>
            <h2>That is an odd number!</h2>
          <% } %>  
      </body>
```
- another method: `<h3><%= num%2===0 ? 'EVEN' : 'ODD' %> </h3>`


# Loops in EJS
- i.e:
```js
      //index.js
      app.get('/cats', (req, res) => {
          const cats = [
              'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
          ]
          res.render('cats', { cats })
      })

      //cats.ejs
      <body>

      <h1>All the cats</h1>
      <ul>
          <% for(let cat of cats) { %>
              <li><%= cat %></li>
          <% } %>
      </ul>
      </body>
```
- a more complex example, when we have a data.json file:
```js
      //index.js
      const redditData = require('./data.json');
      app.get('/r/:subreddit', (req, res) => {
          const {subreddit} = req.params;
          const data =  redditData[subreddit];
          if(data) {
              res.render('subreddit', {...data})
          } else {
              res.render('notfound', { subreddit })
          }
      })
```
```html
      <!-- subreddit.ejs -->
         <title><%= name %> </title>
      </head>
      <body>
          <h1>Browsing the <%= name %> subreddit</h1>
          <h2><%= description %></h2>
          <p><%= subscribers %> Total Subscribers</p>
          <hr>

          <% for(let post of posts) { %> 
              <article>
                  <p><%= post.title %> - <b><%= post.author %></b></p>
                  <% if(post.img) { %>
                      <img src="<%= post.img %>" alt="">
                  <% } %>
              </article>
          <% } %>
      </body>

      <!-- notfound.ejs -->
      <body>
          <h1>Sorry, we couldn't find the <%= subreddit %> subreddit</h1>
      </body>
```

# Serving Static Assets in Express

- serving things like css and JS files that we want to include in the response back to the client side.
- to serve statis files, we need to use the express.static built-in middleware function in Express: `express.static(root, [options])`
- the root argument specifies the root directory from which to serve static assets.
- i.e:  `app.use(express.static('public'))`   <-- now you can load the files that are in the public directory
- we create a directory for all the files:
```
      $ mkdir public
      $ cd public
      $ touch app.css
      //index.js
      app.use(express.static('public'))
      //subreddit.ejs
       <link rel="stylesheet" href="/app.css">
```
- in order to start the server from anywhere, we need to add the full path:
```js
      //index.js
      app.use(express.static(path.join(__dirname, 'public')))
```

# Bootstrap + Express

- we first create a public directory that contains css and js directories.
```
$ ls css
bootstrap.min.css
$ ls js
bootstrap.min.js
```
```html
<!-- subreddit.ejs -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="/js/jquery.js" type="text/javascript"></script>
    <script src="/js/bootstrap.min.js" type="text/javascript"></script>
```

# EJS & Partials

- we need to create a partial file that will contian the headers and include it to the template using <%- %> tags
- this line can be added to every .ejs files that you want: `<%- include('partials/head')%>`
```html
<!-- $ cat views/partials/head -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= name %> </title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="/js/jquery.js" type="text/javascript"></script>
    <script src="/js/bootstrap.min.js" type="text/javascript"></script>
</head>
```

# Get Vs. Post Requests

- Get   
    - used to retrieve information
    - data is sent via query string
    - information is plainly visible in the URL
    - limited amount of data can be sent
- Post  
    - used to post data to the server
    - used to write/create/update
    - data is sent via request body, not a query string
    - can send any sort of data (including JSON)


# Express Post Routes
```html
<!-- getpost.html -->
<body>
    <h1>GET and POST Rquests</h1>
    <h2>GET</h2>
    <form action="http://localhost:3000/tacos" method="GET">
        <input type="text" name="meat">
        <input type="number" name="qty">
        <button>Submit</button>
    </form>
    <h2>POST</h2>
    <form action="http://localhost:3000/tacos" method="POST">
        <input type="text" name="meat">
        <input type="number" name="qty">
        <button>Submit</button>
    </form>
</body>
```
```js
//index.js
const express = require('express');
const app = express();

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    res.send("POST /tacos response")
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```

# Parsing the request Body

- req.body  = contains key-value pairs of data submitted in the request body
    - by default it is undefined and is populated when you use body-parsing middleware such as `express.json()` or `express.urlencoded()`
- we need to add the following line in the index.js file: `app.use(express.urlencoded({ extended: true }))`
- this is what we tell express to do: use this middleware that is going to parse the request body as urlencoded data
```js
//index.js
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")       
})

app.post('/tacos', (req, res) => {
    //console.log(req.body)                // { meat: 'pork', qty: '1' } in the console
    //res.send("POST /tacos response")
    const {meat, qty} = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```

# REST

- REST = Representational State Transfer
- REST is an architectural style for distributed hypermedia systems
- it's basically a set of guidelines for how a client+server should communicate and perform CRUD operations on a given resource
- CRUD = create/read/update/delete
- the main idea of REST is treating data on the server-side as respurces than can be CRUDed
- the most common way of approaching REST is in formatting the URLs and HTTP verbs in your applications
- pattern we are going to follow:
    - Index     GET /comments - list all comments
    - new       GET /comments/new - form to create new comment
    - Create    POST /comments - create a new comment
    - Show      GET /comments/:id - get one comment (using ID)
    - Edit      GET /comments/:id/edit - form to edit specific comment
    - Update    PATCH /comments/:id - update one comment
    - Delete    DELETE /comments/:id - destroy one comment
- `res.redirect` = redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code.
- to generate some unique IDs, we need to install uuid package: `npm i uuid`
- then require it:  
```js
    const {v4: uuidv4} = require('uuid');
    uuidv4();
```
- `PATCH` request method: used to apply partial modifications to a resource
- `PUT` request method: replaces all current representations of the target resource with the request payload
- we can use `app.put()`, `app.patch()`
-`method-override` package = it lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it: `npm i method-override`
- DEMO:
```js
//index.js
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4: uuid} = require('uuid');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'Lari',
        comment: 'bla bla bla'
    },
    {
        id: uuid(),
        username: 'Al3x',
        comment: 'ce naspetel sunt'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment})
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```
```html
<!-- index.ejs -->
<body>
<h1>Comments</h1>
<ul>
    <% for(let c of comments) {%>
        <li>
            <%= c.comment %> - <b><%= c.username %></b>
            <a href="/comments/<%= c.id %>">Details</a>
        </li>
    <% } %> 
</ul>
<a href="/comments/new">New Comment</a>
</body>

<!-- edit.ejs -->
<body>
<h1>Edit</h1>
<form method="POST" action="/comments/<%= comment.id %>?_method=PATCH">
    <textarea name="comment" id="" cols="30" rows="10">
        <%= comment.comment %> 
    </textarea>
    <button>Save</button>
</form>
</body>

<!-- show.ejs -->
<body>
    <h1>Comment id: <%= comment.id %></h1>
    <h2><%= comment.comment %> - <%= comment.username  %></h2>
    <a href="/comments">Back to index</a>
    <a href="/comments/<%= comment.id %>/edit">Edit Comment</a>
    <form method="POST" action="/comments/<%= comment.id %>?_method=DELETE">
    <button>Delete</button>
    </form>

<!-- new.ejs -->
<body>
    <h1> Make a new comment</h1>
    <form action="/comments" method="POST">
        <section>
            <label for="username">Enter username</label>
            <input type="text" id="username" placeholder="username" name="username">
        </section>
        <section>
            <label for="comment">Comment Text</label>
            <br>
            <textarea name="comment" id="comment" cols="30" rows="5"></textarea>
        </section>
        <button>Submit</button>
    </form>
    <a href="/comments">Back to index</a>
</body>
```

# EJS Tool for Layouts

- `ejs-mate` package
```
$ npm i ejs-mate
```
```js
//index.js
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
```
```
$ mkfile ./views/layouts/boilerplate.ejs
```
```html
<!-- boilerplate.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boilerplate!!</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
</head>
<body>
    <%- include('../partials/navbar') %>           <!-- we include partials -->
    <main class="container mt-5">
    <%- body %>                 <!-- <--- -->
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</body>
</html>

<!-- in all the other templates (ejs files) we add layout function;  -->
<% layout('layouts/boilerplate') %>         <!-- <-----  -->
    <h1>All Campgrounds</h1>
    <div>
    <a href="/campgrounds/new">New Campground</a>
    </div>
    <ul>
        <% for (let campground of campgrounds) { %> 
            <li><a href="/campgrounds/<%= campground._id %>"><%= campground.title %></a></li>
        <% } %> 
    </ul>
```

# Handling Errors in Express Apps

- Express has a Built-In error handler; documentation: [Error Handling](https://expressjs.com/en/guide/error-handling.html)
- this takes care of any errors that might be encountered in the app. 
- This default error-handling middleware function is added at the end of the middleware function stack.
- i.e:      
```js
    app.get('/error', (req, res) => {
        chicken.fly()
    })
```
- we get a http response (html response, error code 500 Internal Server Error): 
```
    ReferenceError: chicken is not defined
        at app.get (/home/larisa/Documents/Handling_Errors/index.js:31:5)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
        at next (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/route.js:137:13)
        at Route.dispatch (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/route.js:112:3)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
        at /home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:281:22
        at Function.process_params (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:335:12)
        at next (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:275:10)
        at app.use (/home/larisa/Documents/Handling_Errors/index.js:9:5)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
```
- we can throw an error:
    ```js
    const verifyPassword = (req, res, next) => {
        const {password} = req.query;
        if(password === 'chickennugget') {
            next();
        }
        //res.send('Sorry, you need a password')
        throw new Error('Password required!')       //<---
    }
    ```
    - we get:
    ```
    Error: Password required!
        at verifyPassword (/home/larisa/Documents/Handling_Errors/index.js:23:11)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
        at next (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/route.js:137:13)
        at Route.dispatch (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/route.js:112:3)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
        at /home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:281:22
        at Function.process_params (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:335:12)
        at next (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/index.js:275:10)
        at app.use (/home/larisa/Documents/Handling_Errors/index.js:9:5)
        at Layer.handle [as handle_request] (/home/larisa/Documents/Handling_Errors/node_modules/express/lib/router/layer.js:95:5)
    ```
- Express is handling all errors encountered inside of any route and middleware and it responds with a default 500 status code


# Custom Error Handlers

- error-handling middleware functions are defined in the same way as other middleware functions, 
    except error-handling functions have four arguments instead of three: (err, req, res, next).
- we define error-handling middleware last, after other `app.use()` and routes calls; 
```js
        app.use((err, req, res, next) => {
            console.log("**************************************")
            console.log("****************Error*****************")
            console.log("**************************************")
            next(err)
        })
```
- If you pass anything to the `next()` function (except the string `route`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.
- If you call `next()` with an error after you have started writing the response the Express default error handler closes the connection and fails the request.
- custom error class:
    ```js
        //AppError.js
        class AppError extends Error {
            constructor(message, status) {
                super();
                this.message = message;
                this.status = status;
            }
        }

        module.exports = AppError;

        //index.js
        const AppError = require('./AppError');

        const verifyPassword = (req, res, next) => {
            const {password} = req.query;
            if(password === 'chickennugget') {
                next();
            }
            throw new AppError('password required', 401);
            //res.send('Sorry, you need a password')
            //throw new AppError('Password required!')
        }

        app.use((err, req, res, next) => {
            const {status = 500} = err;         //<--- we give a default value of 500
            res.status(status).send('Errorrrrr!')
        })
    ```
    - we can also use the message from AppError.js:
    ```js
        //AppError.js
        app.get('/admin', (req, res) => {
            throw new AppError('You are not an admin', 403)
        })

        app.use((err, req, res, next) => {
            const {status = 500, message = 'Something went wrong'} = err;
            res.status(status).send('message')
        })
    ```

# Handing Async Errors

- For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the `next()` function, where Express will catch and process them. 
- i.e:
```js
    //index.js
    const AppError = require('./AppError');

    app.get('/products/new', (req,res) => {
        throw new AppError('NOT ALLOWED', 401)      //<--- this doesn't work for async functions
        res.render('products/new', {categories})
    })

    app.get('/products/:id', async (req, res, next) => {        //<--- for async func we need to use 'next' parameter
        const {id} = req.params;
        const product =  await Product.findById(id)
        if (!product) {                                         //<--- in case the id is not found in the db
            return next(new AppError('Product Not Found', 404));
        }
        res.render('products/show', {product})
    })
```
- this error handling mechanism is to handle when an id with the valid ObjectId format is passed but nothing is found in the database
- If you pass an invalid `ObjectId` (like a shorter/incomplete id string), then when it's passed to the `.findById()` method it will actually fail to cast because mongoose/mongodb won't recognize it as a valid id (because the format itself is invalid). 
- therefore, the cast error happens earlier and that's why the cast error message is shown.
- i.e for a mongoose error:
```js
    //index.js
    app.post('/products', async (req, res, next) => {
        try {
            const newProduct = new Product(req.body)            //<--- we use try and catch
            await newProduct.save();
            res.redirect(`/products/${newProduct._id}`)
        }   catch(e) {
            next(e);
        }
    })

    app.put('/products/:id', async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
            console.log(req.body);
            res.redirect(`/products/${product._id}`)
        } catch(e) {
            next(e);
        }
    })

    app.get('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const product =  await Product.findById(id)
        if (!product) {
            throw new AppError('Product Not Found', 404);
        }
        res.render('products/show', {product})
    } catch(e) {
        next(e);
    }
})
```

# Defining An Async Utility

- if an error is thrown in a function and it's not caught, we can catch it in the next parent function
- `wrapAsync` is going to return a function, and that function is gonna call the function inside that we passed in, which is an async funct, so it returns a promise,
    so we can call .catch on that function and then pass any error to next.
- we want to make a function that we can wrap our async callbacks in so that we don't have to type 'try catch next error' over and over again.
- this is what we are going to do for every one of these async functions
- therefore, we need to modify index.js as below:
```js
        //index.js
        function wrapAsync(fn) {
            return function(req, res, next){
                fn(req, res, next).catch(e => next(e))
            }
        }

        app.get('/products', wrapAsync(async (req,res, next) => {
                const {category} = req.query;
                if(category){
                    const products = await Product.find({category})
                    res.render('products/index', {products, category})
                } else {
                    const products = await Product.find({})
                    res.render('products/index', {products, category: 'All'})
                }
        }))

        app.get('/products/new', (req,res) => {
            res.render('products/new', {categories})
        })

        app.post('/products', wrapAsync(async (req, res, next) => {
                const newProduct = new Product(req.body)
                await newProduct.save();
                res.redirect(`/products/${newProduct._id}`)
        }))

        app.get('/products/:id', wrapAsync(async (req, res, next) => {
                const {id} = req.params;
                const product =  await Product.findById(id)
                if (!product) {
                    throw new AppError('Product Not Found', 404);
                }
                res.render('products/show', {product})
        }))

        app.get('/products/:id/edit', wrapAsync(async (req,res, next) => {
                const {id} = req.params;
                const product =  await Product.findById(id)
                if (!product) {
                    throw new AppError('Product Not Found', 404);
                }
                res.render('products/edit', {product, categories})
        }))

        app.put('/products/:id', wrapAsync(async (req, res, next) => {
                const {id} = req.params;
                const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
                console.log(req.body);
                res.redirect(`/products/${product._id}`)
        }))
```
- usually, the functions are put in a different file.


# Differentiating Mongoose Errors

- Mongoose has sorts of different errors that it could throw depending on what's going wrong. We are going to focus on a couple of them:
- validation errors(i.e try to make a product where I'm leaving things blank):
    - if we want to have more custom feedback
- every Mongoose error has a property called name
```js
        //index.js
        app.use((err, req, res, next) => {
            console.log(err.name);          //<-- on the console we will see ValidationError or CastError, etc
            next(err);
        })
        //in our case the error on the browser will be: Product validation failed: name: Path `name` is required.
```
- we can also edit the model, to add a default message for some type of error:
```js
        //models/product.js
        const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'name cannot be blank']
        },

        //index.js
        const handleValidationErr = err => {
            console.log(err);
            return err;
        }

        app.use((err, req, res, next) => {
            console.dir(err.name);
            if(err.name === 'ValidationError') err = handleValidationErr(err)   // <--- interpretate a specific type of error
            next(err);                                                          // <--- now we get: Validation failed: name: name cannot be blank
        })
```
- other possibility: 
```js
        const handleValidationErr = err => {
    console.log(err);
    return new AppError(`Validation Failed...${err.message}`, 400);     //<--- Validation Failed...Product validation failed: name: name cannot be blank
}
```

# JOI

- JOI = The most powerful schema description language and data validator for JavaScript
- documentation:
    - https://github.com/sideway/joi
    - https://joi.dev/api/?v=17.4.1
- YelpCamp example where we use JOI for server side validations:
```js
        //app.js
        app.post('/campgrounds', catchAsync(async (req, res, next) => {
        // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    
        const campgroundSchema = Joi.object({
            campground: Joi.object({
                title: Joi.string().required(),
                price: Joi.number().required().min(0)
            }).required()
        })
        const result = campgroundSchema.validate(req.body);
        // console.log(result);
        if result.error
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
    }))
```    
- if we use this in more than one place, we should build a middleware and use it on all the routes where we need validation
```js
        //app.js
        const validateCampground = (req, res, next) => {
        const campgroundSchema = Joi.object({
            campground: Joi.object({
                title: Joi.string().required(),
                price: Joi.number().required().min(0),
                image: Joi.string().required(),
                location: Joi.string().required(),
                description: Joi.string().required()
            }).required()
        })
        const {error} = campgroundSchema.validate(req.body);
        if (error){
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next();
        }
    }

    app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
    }))

    app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res) => {
        const {id} = req.params;
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        res.redirect(`/campgrounds/${campground._id}`)
    }))
```