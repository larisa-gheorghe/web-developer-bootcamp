# Express Router

- documentation: [Express Router](http://expressjs.com/en/4x/api.html#express.router)
- `express.router` created a new router object
- a router object is an isolated instance of middleware ad routes
- you can think of it as a “mini-application,” capable only of performing middleware and routing functions
- every Express application has a built-in app router
- we first create a new folder to put our routes: `$ mkdir routes`
- for every group of routes, we create a file
- i.e:
```js
    //index.js
        const express = require('express');
        const app = express();
        const shelterRoutes = require('./routes/shelters')

        app.use('/', shelterRoutes);

        app.listen(3000, () => {
            console.log('Serving app on localhost:3000')
        })

    //routes/shelters.js
        const express = require('express');
        const router = express.Router();

        router.get('/shelters', (req, res) => {
            res.send("All Shelters")
        })

        router.post('/shelters', (req, res) => {
            res.send("Creating Shelter")
        })

        router.get('/shelters/:id', (req, res) => {
            res.send("Viewing one shelter")
        })

        router.get('/shelters/:id/edit', (req, res) => {
            res.send("Editing a shelter")
        })

        module.exports = router;
```
- to be more specific, you can modify a router for a more particular root URL:
```js
    //index.js
        const express = require('express');
        const app = express();
        const shelterRoutes = require('./routes/shelters')

        app.use('/shelters', shelterRoutes);                             //<------

        app.listen(3000, () => {
            console.log('Serving app on localhost:3000')
        })

    //routes/shelters.js
        const express = require('express');
        const router = express.Router();

        router.get('/', (req, res) => {
            res.send("All Shelters")
        })

        router.post('/', (req, res) => {
            res.send("Creating Shelter")
        })

        router.get('/:id', (req, res) => {
            res.send("Viewing one shelter")
        })

        router.get('/:id/edit', (req, res) => {
            res.send("Editing a shelter")
        })

        module.exports = router;
```

# Express Router & Middleware

- we can set middleware for a specific router:
```js
    //index.js
        const express = require('express');
        const app = express();
        const shelterRoutes = require('./routes/shelters');
        const dogsRoutes = require('./routes/dogs');
        const adminRoutes = require('./routes/admin')

        app.use('/shelters', shelterRoutes);
        app.use('/dogs', dogsRoutes);
        app.use('/admin', adminRoutes);

        app.listen(3000, () => {
            console.log('Serving app on localhost:3000')
        })
        
    //router/admin.js
        const express = require('express');
        const router = express.Router();

        router.use((req, res, next) => {       // <--- we need to include the query string: http://localhost:3000/admin/topsecret?isAdmin=true
            if (req.query.isAdmin) {
                next();
            }
            res.send("Sorry not an admin")
        })

        router.get('/topsecret', (req, res) => {
            res.send('This is top secret')
        })

        router.get('/deleteeverything', (req, res) => {
            res.send('Erased everything')
        })

        module.exports = router;
```
- routers have separate params; when we use routes, we will not have access to the parameters, unless we specify with:
```js
const router = express.Router({mergeParams: true});
```

# Cookies

- cookies are little bits of information that are stored in a user's browser when browsing a particular website
- once a cookie is set, a user's browser will send the cookie on every subsequent request to the site
- cookies allow use to make HTTP stateful
- documentation: [Cookies](http://expressjs.com/en/4x/api.html#res.cookie)
- to check what cookies we have on a specific site: `Inspect -> Application -> Cookies`
- i.e:
```js
//index.js
        app.get('/setname', (req, res) => {
            res.cookie('name', 'henrietta');
            res.cookie('animal', 'harlequin shrimp')
            res.send('OK sent you a cookie')
        })
```
- cookie-parser = parse Cookie header and populate req.cookies with an object keyed by the cookie names
    - optionally you may enable signed cookie support by passing a secret string, which assigns `res.secret` so it mai be used by other middleware
    - `npm i cookie-parser`
    - i.e:
    ```js
            //index.js
            const express = require('express');
            const app = express();

            const cookieParser = require('cookie-parser');
            app.use(cookieParser());

            app.get('/greet', (req, res) => {
                console.log(req.cookies)
                const {name = 'No-name'} = req.cookies;
                res.send(`Hey there, ${name}!`)
            })

            app.get('/setname', (req, res) => {
                res.cookie('name', 'henrietta');
                res.cookie('animal', 'harlequin shrimp')
                res.send('OK sent you a cookie')
            })

            app.listen(3000, () => {
                console.log('Serving app on localhost:3000')
            })
    ```
- signing cookies: the cookie parser will sign it using a secret code that we are gonna specify, to verify the integrity of the sent cookies
```js
        //index.js
        const express = require('express');
        const app = express();

        const cookieParser = require('cookie-parser');
        app.use(cookieParser('thisismysecret'));       // <-- set a secret

        app.get('/greet', (req, res) => {
            console.log(req.cookies)
            const {name = 'No-name'} = req.cookies;
            res.send(`Hey there, ${name}!`)
        })

        app.get('/setname', (req, res) => {
            res.cookie('name', 'henrietta');
            res.cookie('animal', 'harlequin shrimp')
            res.send('OK sent you a cookie')
        })

        app.get('/getsignedcookie', (req, res) => {
            res.cookie('fruit', 'grape', {signed: true})        //<--- to sign a cookie wwe use {signed: true} syntax
            res.send('OK signed your fruit cookie')
        })

        app.listen(3000, () => {
            console.log('Serving app on localhost:3000')
        })
```
- `req.signedCookies`: If the cookie has been signed, you have to use `req.signedCookies`.
- When using cookie-parser middleware, this property contains signed cookies sent by the request, unsigned and ready for use. 
- Signed cookies reside in a different object to show developer intent; 
- otherwise, a malicious attack could be placed on req.cookie values (which are easy to spoof). 
- Note that signing a cookie does not make it “hidden” or encrypted; but simply prevents tampering (because the secret used to sign is private).
- If no signed cookies are sent, the property defaults to `{}`.


# Express Sessions

- it's not very practical (or secure) to store a lot of data client-side using cookies.
- sessions are a server-side data store that we use to make HTTP stateful
- instead of storing data using cookies, we store data on the server-side and then send the browser a cookie that can be used to retrieve the data
- documentation: [Express Session](https://www.npmjs.com/package/express-session)
- i.e:
```js
        //index.js
        const express = require('express');
        const app = express();
        const session = require('express-session');

        app.use(session({secret: 'thisisnotagoodsecret'}));

        app.get('/viewcount', (req, res) => {
            //res.send('You have views this page x times')
            if (req.session.count) {
                req.session.count += 1;
            } else {
                req.session.count = 1;
            }
            res.send(`You have viewes this page ${req.session.count} times`)
        })

        app.listen(3000, () => {
            console.log('Serving app on localhost:3000')
        })
```
- first time when we go to `/viewcount`, `req.session.count` does not exist, so it will be set to 1.
- then everytime we access that page on that browser, the count increasses by 1.
- The default server-side session storage, MemoryStore, is purposely not designed for a production environment.
- for production we need to use a compatible session store, like connect-redis, connect-mongo.
- i.e:
```js
        //index.js
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
            const {username = 'Anonymous'} = req.query;    // <--- we use query selector to provide username
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
```

# Express Flash

- connect-flash documentation: https://www.npmjs.com/package/connect-flash
- The flash is a special area of the session used for storing messages
- Messages are written to the flash and cleared after being displayed to the user
- The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
- i.e:
```js
    //index.js
        const express = require('express');
        const app = express();
        const path = require('path');
        const mongoose = require('mongoose');
        const session = require('express-session');
        const flash = require('connect-flash');

        const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
        app.use(session(sessionOptions));
        app.use(flash());

        const Farm = require('./models/farm')

        mongoose.connect('mongodb://localhost:27017/flashDemo', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("MONGO CONNECTION OPEN!!!")
            })
            .catch(err => {
                console.log("OH NO MONGO CONNECTION ERROR!!!!")
                console.log(err)
            })

        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');

        app.use(express.urlencoded({ extended: true }));

        // FARM ROUTES
        app.use((req, res, next) => {
            res.locals.messages = req.flash('success');      //<--- by doing this will have access to messages on every single template
            next();
        })

        app.get('/farms', async (req, res) => {
            const farms = await Farm.find({});
            res.render('farms/index', { farms })
        })
        app.get('/farms/new', (req, res) => {
            res.render('farms/new')
        })
        app.get('/farms/:id', async (req, res) => {
            const farm = await Farm.findById(req.params.id).populate('products');
            res.render('farms/show', { farm })
        })

        app.post('/farms', async (req, res) => {
            const farm = new Farm(req.body);
            await farm.save();
            req.flash('success', 'Successfully made a new farm!');
            res.redirect('/farms')
        })

        app.listen(3000, () => {
            console.log("APP IS LISTENING ON PORT 3000!")
        })
```
```html
    <!-- partials/head.ejs -->
        <!-- [...] -->
        <body>
            <%= messages %>         <!-- display the message if any -->
            <h1>All Farms</h1>
            <ul>
```
- `res.locals` documentation: [res.locals](http://expressjs.com/en/4x/api.html#res.locals)


# Authentication vs Authorization =========

- authentication = the proces of verifying who a particular user is
- we typically authenticate with a username/password combo, but we can also use security questions, facial recognition
- authorization = verifying what a specific user has access to
- generally, we authorize after a user has been authenticated
- never store passwords; rather than storing a password in the database, we run the password through a hashing function first 
  and then store the result in the database
- hashing functions = functions that map input data of some arbitrary size to fixed-size output values
- cryptographic hash functions  
    - one-way fnction which is infeasible to invert
    - small change in input yields large change in the output
    - deterministic- same input yields same output
    - unlikely to find 2 outputs with same value
    - password hash functions are deliberately slow
- password salts - an extra safeguard
- a salt =  a random value added to the password before we hash it
    - it helps ensure unique hashes and mitigate common attacks


# BCRYPT

- BCRYPT = is a password hashing function
- there are 2 packages:    
    - `bcrypt` = it does not work in the browser, is made for node ( server side js)
        - documentation: https://www.npmjs.com/package/bcrypt
    - `bcrypt.js` = is written entirely in javascript
- i.e ( for bcrypt) to generate a salt:
    ```js
    //index.js
        const bcrypt = require('bcrypt');

        const hashPassword = async () => {
            const salt = await bcrypt.genSalt(10);  
            console.log(salt);
        }

        hashPassword();
    ```
    - on console:
    ```
        $ node index.js 
        $2b$10$i4c3BdHtT/2AQCE5QGZ5uu
    ```
- `.hash` method: to hash a password
    ```js
    //index.js (auto-gen a salt and hash on separate function calls)
        const bcrypt = require('bcrypt');

        const hashPassword = async (pw) => {
            const salt = await bcrypt.genSalt(12);  <-- 12 is the recommended minimum (the time increases exponentially with the number set)
            const hash = await bcrypt.hash(pw, salt);
            console.log(salt);
            console.log(hash);
        }

        hashPassword('monkey');
    ```
    - on console:
    ```
        $ node index.js 
        $2b$10$MDENYTJcc6cRBG114ftyp.
        $2b$10$MDENYTJcc6cRBG114ftyp.6rgStzkMnFXN.hmRPyca4ehngc/45YW
    ```
- `.compare` method: to check a password
```js
    //index.js
        const bcrypt = require('bcrypt');

        const hashPassword = async (pw) => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pw, salt);
            console.log(salt);
            console.log(hash);
        }

        const login = async(pw, hashedPw) => {
            const result = await bcrypt.compare(pw, hashedPw);
            if (result) {
                console.log("Logged you in! Successful match")
            } else {
                console.log('Incorrect')
            }
        }

        //hashPassword('monkey');
        // on console we get:  
        // node index.js 
        // $2b$10$Foy/lTIImTNUhBwPZjPpB.
        // $2b$10$Foy/lTIImTNUhBwPZjPpB.DTvPeb3yXRk9OUfUglIvE6F9dhpkfAq

        login('monkey', '$2b$10$Foy/lTIImTNUhBwPZjPpB.DTvPeb3yXRk9OUfUglIvE6F9dhpkfAq');
        // on console we get:
        // $ node index.js 
        // Logged you in! Successful match
```
- there is another methd to auto-gen a salt and hash on the same function:
```js
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });

    //index.js
        const bcrypt = require('bcrypt');

        const hashPassword = async (pw) => {
            const hash = await bcrypt.hash(pw, 12);
            console.log(hash);
        }

        const login = async(pw, hashedPw) => {
            const result = await bcrypt.compare(pw, hashedPw);
            if (result) {
                console.log("Logged you in! Successful match")
            } else {
                console.log('Incorrect')
            }
        }

        //hashPassword('monkey');   // we get $2b$12$iN9.gQPTgol9hagkORzcauTmOJLm.YYVUivfxgzqOE.sCzSaHHEde
        login('monkey', '$2b$12$iN9.gQPTgol9hagkORzcauTmOJLm.YYVUivfxgzqOE.sCzSaHHEde');    // we get: Logged you in! Successful match
```
- register a user:
```js
        app.get('/register', (req, res) => {
            res.render('register')
        })

        app.post('/register', async (req, res) => {
            const {password, username} = req.body
            const hash = await bcrypt.hash(password, 12)
            const user = new User({
                username,
                password: hash
            })
            await user.save();
            req.session.user_id = user._id;
            res.redirect('/secret')
        })
```
- login with a username and password:
```js
        app.get('/login', (req, res) => {
            res.render('login')
        })

        app.post('/login', async (req, res) => {
            const { username, password} = req.body;
            const user = await User.findOne({username});
            const validPassword = await bcrypt.compare(password, user.password)
            if(validPassword) {
                req.session.user_id = user._id;
                res.redirect('/secret');
            } else {
                res.redirect('/login')
            }
        })
```
- logout:
```js
        app.post('/logout', (req, res) => {
            req.session.user_id = null;     //<---
            res.redirect('/login')
        })
```
- there is another method to logout: you destroy the whole session:
```js
        app.post('/logout', (req, res) => {
                    req.session.destroy();     //<---
                    res.redirect('/login')
```
- middleware to verify if someone is logged in or not:
```js
        const requireLogin = (req, res, next) => {
            if (!req.session.user_id) {
                return res.redirect('/login')
            }
            next();
        }

        app.get('/secret', requireLogin, (req, res) => {
            res.render('secret')
        })

        app.get('/topsecret', requireLogin, (req, res) => {
            res.send("TOP SECRET!")
        })
```
- refactoring login middleware:
```js
        //models/user.js
        userSchema.statics.findAndValidate = async function(username, password) {
            const foundUser = await this.findOne({username});
            const isValid = await bcrypt.compare(password, foundUser.password);
            return isValid? foundUser : false;
        }

        userSchema.pre('save', async function(next) {
            if (!this.isModified('password')) return next();        //<--- if the password was not modified, there is no need to hash it again, as it remains unchanged 
            this.password = await bcrypt.hash(this.password, 12);
            next();
        })
```

# Passport

- instead of using bcrypt, we can use a tool called Passport
- Passport = authentication middleware for Node.js
    - it can be dropped in to any Express based web application
- documentation:    
    - https://www.passportjs.org/
    - https://www.passportjs.org/packages/passport-local/
- in addition there is a passport-local-mongoose package: https://www.npmjs.com/package/passport-local-mongoose
```
        $ npm i passport passport-localassport-local-mongoose
```
- i.e:
```js
        //models/user.js
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        const passportLocalMongoose = require('passport-local-mongoose');

        const UserSchema = new Schema({
            email: {
                type: String,
                required: true
            }
        });

UserSchema.plugin(passportLocalMongoose);       //<--- this is going to add the password and username fields
```
- Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value
- configuring Passport:
```js
        // index.js
        const passport = require('passport');
        const LocalStrategy = require('passport-local');
        const User = require('./models/user');

        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(User.authenticate()));

        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
```

# Controllers

- controllers = functions that separate out the code to route requests from the code that actually processes requests
- i.e: 
```js
        //routes/campgrounds.js
        const campgrounds = require('../controllers/campgrounds');

        router.get('/', catchAsync(campgrounds.index));

        //controllers/campgrounds.js
        module.exports.index = async (req, res) => {
            const campgrounds = await Campground.find({});
            res.render('campgrounds/index', {campgrounds})
```

# Restructuring Routes

- documentation: http://expressjs.com/en/4x/api.html#router.route
- `router.route(path)` = Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware
- Use `router.route()` to avoid duplicate route naming and thus typing errors.
- i.e:
    - instead of writing:
    ```js
        router.get('/', catchAsync(campgrounds.index));
        router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    ```
    - we can use `router.route()`:
    ```js
        router.route('/')
            .get(catchAsync(campgrounds.index))
            .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    ```

# Displaying Star Rating

- LunarLogic/starability: https://github.com/LunarLogic/starability
- it is a css file that we need to add in our public/stylesheets directory


# Image Upload Process

- a regular html form is not going to be able to send files to our server; we need to change our form
- we need to store the images somewhere; typically we don;t store images in Mongo because are very large and there is a BSON-document size limit of 16MB
- we will use Cloudinary, which stores information for us (in our case images)
- documentation: https://cloudinary.com/
- every form that we have done until now is a urlencoded form ( the default one).
- if we want to upload files, we need to set the encoding type (enctype) to multipart/form-data
- in order to parse that multipart form, we need to use another middleware, caller Multer
- documentation: https://www.npmjs.com/package/multer
- Multer will do what the builtin body-parsing middleware does, so that we can pass JSON, or URLencoded form
- upload a single file:
```js
        //campgrounds.js
        const multer  = require('multer');
        const upload = multer({ dest: 'uploads/' });

        router.route('/')
            .post(upload.single('image'), (req, res) => {     
                console.log(req.body, req.file);
                res.send('It worked');
            })
```
```html
        <!-- routes/new.ejs -->
        <form action="/campgrounds" method="POST" novalidate class="validated-form" enctype="multipart/form-data">
        [..]
        <input type="file" name="image" id="">
```
- upload multiple files
```js
        //campgrounds.js
        const multer  = require('multer');
        const upload = multer({ dest: 'uploads/' });

        router.route('/')
            .post(upload.array('image'), (req, res) => {     
                console.log(req.body, req.files);
                res.send('It worked');
            })
```
```html
        <!-- routes/new.ejs -->
        <form action="/campgrounds" method="POST" novalidate class="validated-form" enctype="multipart/form-data">
        <!-- [..] -->
        <input type="file" name="image" id="" multiple>
```

# Environment Variables

- we need to use a ENV file, that we don't share to other people(a file that stays on our machine locally), to store our credentials:
- it's called tipically dotenv: `$ npm i dotenv`
- `.env` file contains key-value pairs
```
//.env
CLOUDINARY_CLOUD_NAME=ffsfdsdsd
CLOUDINARY_KEY=47443434342
CLOUDINARY_SECRET=hkIXbBfsdfrgds34435wf
```
```js
//app.js
if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

console.log(process.env.SECRET);
```
- `process.env.NODE_ENV` is an environment variable that is usually just development or production mode.
- this will take the env variables stored in dotenv so I can access them in other files
- for production there is another way of setting env variables where we don't store them in a file and we just add them in the environment 
- the next step is to take the files uploaded that Multer is able to pass from the form and upload them to Cloudinary;
- to do this, there is a tool called Multer Storage Cloud that works with Multer
- documentation: https://github.com/affanshahid/multer-storage-cloudinary
- it will help us also so that once we get the URLs back from Cloudinary, Multer add those in , so we can have access to them in our route handling callbacks
- i.e:
```js
    //cloudinary/index.js
        const cloudinary = require('cloudinary').v2;
        const { CloudinaryStorage } = require('multer-storage-cloudinary');

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY.KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });

        const storage = new CloudinaryStorage({
            cloudinary,
            params: {
                folder: 'YelpCamp',
                allowedFormats: ['jpeg', 'png', 'jpg']
            } 
        });

        module.exports = {
            cloudinary,
            storage
        }

    //routes/campgrounds.js
        const {storage} = require('../cloudinary');
        const upload = multer({storage});
```

# Displaying Images in a Carousel ==========

- using bootstrap: https://getbootstrap.com/docs/5.1/components/carousel/
- i.e:
```html
<!-- show.ejs -->
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <% campground.images.forEach((img, i) => {%> 
            <div class="carousel-item <%= i === 0 ? 'active' : '' %>">      <!-- the active class needs to be set only on the first image -->
              <img src="<%= img.url %>" class="d-block w-100" alt="">
            </div>
          <% }) %>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
```

# Mapbox

- documentation: https://www.mapbox.com/
- geocoding API: https://docs.mapbox.com/api/search/geocoding/
- mapbox has a node client: https://github.com/mapbox/mapbox-sdk-js
- we will be using `forwardGeocode`: https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#forwardgeocode
- i.e: we copy the token from mapbox and add it in the .env file: MAPBOX_TOKEN=pk.eyJ1IjoibGFye
```js
    //controllers/campgrounds.js
        const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
        const mapBoxToken = process.env.MAPBOX_TOKEN;
        const geocoder = mbxGeocoding({accessToken: mapBoxToken});

        module.exports.createCampground = async (req, res, next) => {
            const geoData = await geocoder.forwardGeocode({
                query: req.body.campground.location,
                limit: 1
            }).send()
            res.send(geoData.body.features[0].geometry.coordinates);    //<--- the coordinates are [longitude, latitude] 
```
- `geoData.body.features[0].geometry` is a GeoJSON; i.e `{"type":"Point","coordinates":[-118.1268,34.0927]}`
- in order to store them in Mongo, we will save the entire geometry
- documentation: https://mongoosejs.com/docs/geojson.html
```js
    //controllers/campgrounds.js
        module.exports.createCampground = async (req, res, next) => {
            const geoData = await geocoder.forwardGeocode({
                query: req.body.campground.location,
                limit: 1
            }).send()
            const campground = new Campground(req.body.campground);
            campground.geometry = geoData.body.features[0].geometry;
            campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
            campground.author = req.user._id;
            await campground.save();
            console.log(campground);
            req.flash('success', 'Successfully made a new campground!');
            res.redirect(`/campgrounds/${campground._id}`)
        }
```
- displaying a Map: for this we will use mapbox GL JS
- documentation: https://docs.mapbox.com/mapbox-gl-js/guides/install/#quickstart
- map popup: https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup


# Cluster Map

- documentation: https://docs.mapbox.com/mapbox-gl-js/example/cluster/
- add controls: https://docs.mapbox.com/mapbox-gl-js/example/navigation/


# Mongo Injection

- i.e: when someone tries to manipulate the way a query behaves
```
        db.users.find({username: req.body.username})
        db.users.find({username: {"$gt":""}})   <--- instead of selecting only one user, this line find and retrive all users
```
- in order to address the basic level of attach, we should not allow users to have `$` `,` etc
- there is a package that helps us doing that: express mongo sanitize -  https://www.npmjs.com/package/express-mongo-sanitize
- i.e:
```js
    //app.js
        const mongoSanitize = require('express-mongo-sanitize');
        // To remove data, use:
        app.use(mongoSanitize());
```

# Cross Site Scripting (XSS)

- XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users
- a tool that introduces the idea of XSS attack: https://xss-game.appspot.com/
- instead of using Joi, we could have used express-validator, which is not vulnerable to XSS attacks, but in our case we need to add some lines:
- i.e:
```js
    //schemas.js
        const BaseJoi = require('joi');
        const sanitizeHtml= require('sanitize-html');
        const extension = (joi) => ({
        type: 'string',
        base: joi.string(),
        messages: {
            'string.escapeHTML': '{{#label}} must not include HTML!'
        },
        rules: {
            escapeHTML: {
                validate(value, helpers) {
                    const clean = sanitizeHtml(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (clean !== value) return helpers.error('string.escapeHTML', {value})
                    return clean;
                }
            }
        }
    });

        const Joi = BaseJoi.extend(extension)

        module.exports.campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required().escapeHTML(),
            price: Joi.number().required().min(0),
            //image: Joi.string().required(),
            location: Joi.string().required().escapeHTML(),
            description: Joi.string().required().escapeHTML()
        }).required(),
        deleteImages: Joi.array()
    });
```
- we also use sanitize-html package: https://www.npmjs.com/package/sanitize-html


# Helmet

- documentation: https://helmetjs.github.io/
- i.e:
```js
    //app.js
        const helmet = require('helmet');

        app.use(helmet());

        const scriptSrcUrls = [
            "https://stackpath.bootstrapcdn.com/",
            "https://api.tiles.mapbox.com/",
            "https://api.mapbox.com/",
            "https://kit.fontawesome.com/",
            "https://cdnjs.cloudflare.com/",
            "https://cdn.jsdelivr.net/",
        ];
        const styleSrcUrls = [
            "https://kit-free.fontawesome.com/",
            "https://stackpath.bootstrapcdn.com/",
            "https://api.mapbox.com/",
            "https://api.tiles.mapbox.com/",
            "https://fonts.googleapis.com/",
            "https://use.fontawesome.com/",
            "https://cdn.jsdelivr.net",
        ];
        const connectSrcUrls = [
            "https://api.mapbox.com/",
            "https://a.tiles.mapbox.com/",
            "https://b.tiles.mapbox.com/",
            "https://events.mapbox.com/",
        ];
        const fontSrcUrls = [];
        app.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: [],
                    connectSrc: ["'self'", ...connectSrcUrls],
                    scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
                    styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                    workerSrc: ["'self'", "blob:"],
                    objectSrc: [],
                    imgSrc: [
                        "'self'",
                        "blob:",
                        "data:",
                        "https://res.cloudinary.com/dqo3oexqo/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                        "https://images.unsplash.com/",
                    ],
                    fontSrc: ["'self'", ...fontSrcUrls],
                },
            })
        );
```

# Deploying

- Mongo Atlas: https://www.mongodb.com/cloud
- using Mongo for our session store:
    - we will use connect-mongo package: https://www.npmjs.com/package/connect-mongo
- Heroku: https://www.heroku.com/
- we need to install the Heroku CLI:  https://devcenter.heroku.com/articles/heroku-cli
- then, on the terminal we need to login:
```
        $ heroku login
        $ heroku create
        Creating app... done, ⬢ blooming-caverns-61216
        https://blooming-caverns-61216.herokuapp.com/ | https://git.heroku.com/blooming-caverns-61216.git
        $ git init
        $ heroku git:remote -a blooming-caverns-61216
        $ git remote -v
        heroku	https://git.heroku.com/blooming-caverns-61216.git (fetch)
        heroku	https://git.heroku.com/blooming-caverns-61216.git (push)
        $ git config --global user.email "larisa.camelia.gheorghe@gmail.com"
        $ git config --global user.name "Larisa"
        $ git add .
        $ git commit -m "ready to try deploying"
        $ git push heroku master
        // in case of errors we need to check the logs by running: $ heroku logs --tail
        //every time we make a change we need to add and commit again:
        $ git add .
        $ git status
        $ git commit -m "add start script"
        $ git push heroku master
        // we need to add the env variables:
        //we can do it directly from heroky dashbord or using the command:
        $ heroku config:set SECRET=thisshouldbeasecret 
```