# Introduction

- Mongo = a popular database commonly used in combination with Node and Express (MEAN & MERN stacks)
    - a document database, which we can use to store and retrieve complex data from
    - it plays particularly well with JS
- SQL DB = Structure Query Language DB are relational DB; We pre-define a schema of tables before we insert anything
- NoSQL DB = do not use SQL; There are many types of no-sql dbs, including document, key-value and graph stores
- Installation:[Instalation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

- start MongoDB: `sudo systemctl start mongod`
- verify that MongoDB has started successfully: `sudo systemctl status mongod`
- you can optionally ensure that MongoDB will start following a system reboot by issuing the following command: `sudo systemctl enable mongod`
- stop MongoDB: `sudo systemctl stop mongod`
- restart MongoDB: `sudo systemctl restart mongod`
- start a mongo shell (it's a JS shell): `mongo`
```
> help
	db.help()                    help on db methods
	db.mycoll.help()             help on collection methods
	sh.help()                    sharding helpers
	rs.help()                    replica set helpers
	help admin                   administrative help
	help connect                 connecting to a db help
	help keys                    key shortcuts
	help misc                    misc things to know
	help mr                      mapreduce

	show dbs                     show database names
	show collections             show collections in current database
	show users                   show users in current database
	show profile                 show most recent system.profile entries with time >= 1ms
	show logs                    show the accessible logger names
	show log [name]              prints out the last segment of log in memory, 'global' is default
	use <db_name>                set current database
	db.mycoll.find()             list objects in collection mycoll
	db.mycoll.find( { a : 1 } )  list objects in mycoll where a == 1
	it                           result of the last line evaluated; use to further iterate
	DBQuery.shellBatchSize = x   set default number of items to display on shell
	exit                         quit the mongo shell

> db           <--- it's a variable to show in what db I am currently in
test           <--- default db
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

> use animalShelter                 <--- create a new DB
switched to db animalShelter

> show dbs                          <-- there is nothing in the DB we just created, so it does not show up here
admin   0.000GB
config  0.000GB
local   0.000GB
```

# Inserting with Mongo

- BSON = Binary JSON
	- it's binary structure encodes type and length information which allows it to be parsed much more quickly.
- documentation: [CRUD](https://docs.mongodb.com/manual/crud/)
- we use collections to insert data
- collection = a grouping of data in a db
- methods for inserting documents into a collection:
    - `db.collection.insertOne()`     <--- inserts a single document into a collection.
    - `db.collection.insertMany()`    <--- inserts multiple documents into a collection; it's expecting an array to be passed in
- i.e:
```
		$ mongo
		> show dbs
		admin   0.000GB
		config  0.000GB
		local   0.000GB
		> use animalShelter
		switched to db animalShelter
		> db
		animalShelter
		> db.dogs.insertOne({name: "Charlie", age: 3, breed: "corgi", catFriendly: true})
		{
			"acknowledged" : true,
			"insertedId" : ObjectId("60adeabf90f23af694434d17")
		}
		> show collections
		dogs
		> db.dogs.find()
		{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
```
- the `_id` (primary key) is a property created automatically by mongo; it's unique for every element
- `ObjectId` = is a particular type in Mongo; it's small, likely unique, fast to generate and ordered.
- i.e:
```
		> db.dogs.insertMany([{name: "Bla", breed: "Golden", age: 14, catFriendly: false}, {name: "Tonya", breed: "Chihuahua", age: 17, catFriendly: true}])
		{
			"acknowledged" : true,
			"insertedIds" : [
				ObjectId("60aded8090f23af694434d19"),
				ObjectId("60aded8090f23af694434d1a")
			]
		}
		> db.dogs.find()
		{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 3, "breed" : "corgi", "catFriendly" : true }
		{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
		{ "_id" : ObjectId("60aded8090f23af694434d19"), "name" : "Bla", "breed" : "Golden", "age" : 14, "catFriendly" : false }
		{ "_id" : ObjectId("60aded8090f23af694434d1a"), "name" : "Tonya", "breed" : "Chihuahua", "age" : 17, "catFriendly" : true }

		> db.cats.insertOne({name: "Blue Steele", age: 6, dogFriendly: false, breed: "Scottich fold"})
		{
			"acknowledged" : true,
			"insertedId" : ObjectId("60adee7790f23af694434d1b")
		}
		> db.cats.find()
		{ "_id" : ObjectId("60adee7790f23af694434d1b"), "name" : "Blue Steele", "age" : 6, "dogFriendly" : false, "breed" : "Scottich fold" }
```

# Finding with Mongo

- `db.collection.find()` = a collection method
	- selects documents in a collection or view and returns a cursor to the selected documents.
```
	> db.cats.find()
	{ "_id" : ObjectId("60adee7790f23af694434d1b"), "name" : "Blue Steele", "age" : 6, "dogFriendly" : false, "breed" : "Scottich fold" }
	> db.cats.find({})
	> db.dogs.find({breed: "Golden"})
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d19"), "name" : "Bla", "breed" : "Golden", "age" : 14, "catFriendly" : false }
```
- `db.collection.findOne()` - return the actual document
```
	> db.dogs.findOne({breed: "Golden"})
	{
		"_id" : ObjectId("60adec9890f23af694434d18"),		<--- we only get one back
		"name" : "Wyatt",
		"breed" : "Golden",
		"age" : 14,
		"catFriendly" : false
	}
```

# Updating with Mongo

- methods:	
	- `db.collection.updateOne(<filter>, <update>, <options>)`
	- `db.collection.updateMany(<filter>, <update>, <options>)`
	- `db.collection.replaceOne(<filter>, <update>, <options>)`
- we need to use atomic operators:
- `$set` operator = replaces the value of a field with the specified value
	- expression:	`{ $set: {<field1>: <value1>, ...}}`
- `db.collection.updateOne()`
```
	> db.dogs.updateOne({name: "Charlie"}, {$set: {age: 4}})
	{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
	> db.dogs.find({name: "Charlie"})
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 4, "breed" : "corgi", "catFriendly" : true }

	> db.dogs.updateOne({name: "Charlie"}, {$set: {age: 5, breed: "Lab"}})
	{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
	> db.dogs.find({name: "Charlie"})
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true }

	> db.dogs.updateOne({name: "Charlie"}, {$set: {color: "chocolate"}})  <-- if it doesn't exist, it's created
	{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
	> db.dogs.find({name: "Charlie"})
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true, "color" : "chocolate" }
```
- `db.collection.updateMany()`
```
	> db.dogs.find()
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true, "color" : "chocolate" }
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d19"), "name" : "Bla", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d1a"), "name" : "Tonya", "breed" : "Chihuahua", "age" : 17, "catFriendly" : true }

	> db.dogs.updateMany({catFriendly: true}, {$set: {isAvailable: false}})
	{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

	> db.dogs.find()
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true, "color" : "chocolate", "isAvailable" : false }
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d19"), "name" : "Bla", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d1a"), "name" : "Tonya", "breed" : "Chihuahua", "age" : 17, "catFriendly" : true, "isAvailable" : false }
```
- `$currentDate: {lastModified: true}`
```
	> db.cats.find()
	{ "_id" : ObjectId("60adee7790f23af694434d1b"), "name" : "Blue Steele", "age" : 6, "dogFriendly" : false, "breed" : "Scottich fold" }
	> db.cats.updateOne({age: 6}, {$set: {age:7}, $currentDate: {lastChanged: true}})
	{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
	> db.cats.find()
	{ "_id" : ObjectId("60adee7790f23af694434d1b"), "name" : "Blue Steele", "age" : 7, "dogFriendly" : false, "breed" : "Scottich fold", "lastChanged" : ISODate("2021-05-26T10:25:44.977Z") }
```
- `db.collection.replaceOne` - replace everything while keeping the id the same


# Deleting with Mongo

- methods:	
	- `db.collection.deleteMany()`
	- `db.collection.deleteOne()`

- `db.collection.deleteOne()`
```
	> db.dogs.find()
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true, "color" : "chocolate", "isAvailable" : false }
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d19"), "name" : "Bla", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d1a"), "name" : "Tonya", "breed" : "Chihuahua", "age" : 17, "catFriendly" : true, "isAvailable" : false }
	
	> db.dogs.deleteOne({name: "Bla"})
	{ "acknowledged" : true, "deletedCount" : 1 }
	
	> db.dogs.find()
	{ "_id" : ObjectId("60adeabf90f23af694434d17"), "name" : "Charlie", "age" : 5, "breed" : "Lab", "catFriendly" : true, "color" : "chocolate", "isAvailable" : false }
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
	{ "_id" : ObjectId("60aded8090f23af694434d1a"), "name" : "Tonya", "breed" : "Chihuahua", "age" : 17, "catFriendly" : true, "isAvailable" : false }
```
- `db.collection.deleteMany()`
```
	> db.dogs.deleteMany({isAvailable: false})
	{ "acknowledged" : true, "deletedCount" : 2 }
	> db.dogs.find()
	{ "_id" : ObjectId("60adec9890f23af694434d18"), "name" : "Wyatt", "breed" : "Golden", "age" : 14, "catFriendly" : false }
```
- you can delete everything in a collection: `db.dogs.deleteMany({})`


# Additional Mongo Operators

- documentation: [Operators](https://docs.mongodb.com/manual/reference/operator/query/)
```
> db.dogs.find()
{ "_id" : ObjectId("60ae24feb436922f41a1d8b3"), "name" : "Rusty", "breed" : "Mutt", "age" : 3, "weight" : 25, "size" : "M", "personality" : { "catFriendly" : true, "childFriendly" : true } }
{ "_id" : ObjectId("60ae2554b436922f41a1d8b4"), "name" : "Chungus", "breed" : "Husky", "age" : 3, "weight" : 65, "size" : "L", "personality" : { "catFriendly" : false, "childFriendly" : true } }

> db.dogs.findOne({'personality.childFriendly': true})
{
	"_id" : ObjectId("60ae24feb436922f41a1d8b3"),
	"name" : "Rusty",
	"breed" : "Mutt",
	"age" : 3,
	"weight" : 25,
	"size" : "M",
	"personality" : {
		"catFriendly" : true,
		"childFriendly" : true     <--it's nested, so we need to use 'personality.childFriendly' to retrieve the data
	}
}

> db.dogs.findOne({'personality.childFriendly': true, size: 'M'})
```
- Comparison Query Operators:
	- `$gt` - selects those documents where the value of the field is greater than (i.e. >) the specified value
		- `db.dogs.find( { age: { $gt: 2 } } )`
	- `$gte`- greater than or equal
	- `$l`t, `$lte`	- less than/ less than or equal
	- `$in` - selects the documents where the value of a field equals any value in the specified array. 
		- `db.dogs.find({breed: {$in: ['Mutt', 'Corgi']}})`
	- `$nin` - not in
	- `$ne` - not equal
- Logical Query Operators:
	- `$and`, `$not`, `$nor`, `$or`
	- `db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )`


# Connecting to Mongo with Mangoose

- Mangoose = ODM ( Object Data Mapper)
	- ODMs like Mangoose map documents coming from a db into usable JS objects
	- Mangoose provides ways for us to model out our application data and define a schema
	- it offers easy ways to validate data and build complex queries from the comfort of JS
- documentation: [Mongoose](https://mongoosejs.com/)		
```
$ npm init -y
$ npm i mongoose
$ touch index.js
```
```js
// index.js
const mongoose = require('mongoose')
//if the db movieApp does not exist, it will be created
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NOO, ERROR!")
    console.log(err)
})
```
```
$ node index.js
CONNECTION OPEN!!!
$ node index.js
OH NOO, ERROR!
{ MongoParseError: Invalid port (larger than 65535) with hostname
    at authorityParts.shift.split.map.host (/home/larisa/Documents/MongooseBasics/node_modules/mongodb/lib/core/uri_parser.js:670:28)
```
- operation bufering - Mongoose lets you start using your models immediately, without waiting for mangoose to establish a connection to MongoDB


# Mongo Model

- doc: [Mongo Model](https://mongoosejs.com/docs/api/model.html)
- A Model is a class that's your primary tool for interacting with MongoDB. 
- An instance of a Model is called a Document.
- With Mongoose, everything is derived from a Schema.
- Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
```js
		//index.js
		[..]
		const movieSchema = new mongoose.Schema({		//<-- we define a schema, it has nothing to do with the db, it is a concept on the JS side of the equation
		    title: String,
		    year: Number,
		    score: Number,
		    rating: String
		})
```
- now we can create a model using that schema
```js
		//index.js
		[..]
		const Movie = mongoose.model('Movie', movieSchema);
		const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})  <-- for now, this object is only created on JS side

		$ node
		> .load index.js
		> CONNECTION OPEN!!!

		> amadeus
		{ _id: 60b76fa3def5c60b918b0d8c,
		  title: 'Amadeus',
		  year: 1986,
		  score: 9.2,
		  rating: 'R' }
```
- if we check now in our movieApp db, Amadeus is not present:
```
		$ mongo
		> use movieApp
		switched to db movieApp
		> db.movies.find()		<--- returns nothing
```
- in order to save the new movie to our db, we need to use `.save()` method in node:
```
		$ node
		> amadeus.save()
		Promise {
		  <pending>,
		  domain:
		   Domain {
		     domain: null,
		     _events:
		      [Object: null prototype] {
		        removeListener: [Function: updateExceptionCapture],
		        newListener: [Function: updateExceptionCapture],
		        error: [Function: debugDomainError] },
		     _eventsCount: 3,
		     _maxListeners: undefined,
		     members: [],
		     [Symbol(kWeak)]: WeakReference {} } }
```
- if we check now our db, it is present
```
		$ mongo
		> use movieApp
		> db.movies.find()
		{ "_id" : ObjectId("60b76fa3def5c60b918b0d8c"), "title" : "Amadeus", "year" : 1986, "score" : 9.2, "rating" : "R", "__v" : 0 }
```
- we can change values:
```
		$ node
		> amadeus.score = 9.5		<-- the value is not yet reflected on db side, only in JS side
		9.5
		> amadeus.save()
```
- there is another way of making objects, in our case movies: insertMany() method:
```js
		//index.js
		[..]
		const Movie = mongoose.model('Movie', movieSchema);
		const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})
		
		Movie.insertMany([
		    {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
		    {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
		    {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
		    {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
		    {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}
		])
		.then(data => {
		    console.log("It Worked")
		    console.log(data);
		})
```
```
		$ node index.js
		CONNECTION OPEN!!!
		It Worked
		[ { _id: 60b7783f856bc80d0d559dab,
		    title: 'Amelie',
		    year: 2001,
		    score: 8.3,
		    rating: 'R',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559dac,
		    title: 'Alien',
		    year: 1979,
		    score: 8.1,
		    rating: 'R',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559dad,
		    title: 'The Iron Giant',
		    year: 1999,
		    score: 7.5,
		    rating: 'PG',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559dae,
		    title: 'Stand By Me',
		    year: 1986,
		    score: 8.6,
		    rating: 'R',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559daf,
		    title: 'Moonrise Kingdom',
		    year: 2012,
		    score: 7.3,
		    rating: 'PG-13',
		    __v: 0 } ]

		> db.movies.find()
		{ "_id" : ObjectId("60b76fa3def5c60b918b0d8c"), "title" : "Amadeus", "year" : 1986, "score" : 9.5, "rating" : "R", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559dab"), "title" : "Amelie", "year" : 2001, "score" : 8.3, "rating" : "R", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559dac"), "title" : "Alien", "year" : 1979, "score" : 8.1, "rating" : "R", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559dad"), "title" : "The Iron Giant", "year" : 1999, "score" : 7.5, "rating" : "PG", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559dae"), "title" : "Stand By Me", "year" : 1986, "score" : 8.6, "rating" : "R", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559daf"), "title" : "Moonrise Kingdom", "year" : 2012, "score" : 7.3, "rating" : "PG-13", "__v" : 0 }
```

# Finding with Mongoose

- `.find()`: this will return a query object, which is a thenable object, not a promise
```
		> Movie.find({}).then(data => console.log(data))
		Promise { <pending> }
		> [ { _id: 60b76fa3def5c60b918b0d8c,
		    title: 'Amadeus',
		    year: 1986,
		    score: 9.5,
		    rating: 'R',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559dab,
		    title: 'Amelie',
		    year: 2001,
		    score: 8.3,
		    rating: 'R',
		    __v: 0 },
		  { _id: 60b7783f856bc80d0d559dac,
		    title: 'Alien',
		    year: 1979,
		    score: 8.1,
		    rating: 'R',
		    __v: 0 },

		> Movie.find({rating: 'PG-13'}).then(data => console.log(data))
		Promise { <pending> }
		> [ { _id: 60b7783f856bc80d0d559daf,
		    title: 'Moonrise Kingdom',
		    year: 2012,
		    score: 7.3,
		    rating: 'PG-13',
		    __v: 0 } ]

		> Movie.find({year: {$gte: 2010}}).then(data => console.log(data))
		> Movie.find({year: {$lt: 1990}}).then(data => console.log(data))
```
- `.findOne()`
```
		> Movie.findOne({}).then(data => console.log(data))		<-- find the first one
```
- using `exec()` method is going to give us a full promise, not a thenable object
- `.findById()`
```
> Movie.findById('60b76fa3def5c60b918b0d8c').then(m => console.log(m))
		Promise { <pending> }
		> { _id: 60b76fa3def5c60b918b0d8c,
		  title: 'Amadeus',
		  year: 1986,
		  score: 9.5,
		  rating: 'R',
		  __v: 0 }
```

# Updating with Mongoose

- `.updateOne()` - update the first one
	- it doesn't show us the updated data, only the number of things updated.
```
	> Movie.updateOne({title: 'Amadeus'}, {year: 1984}).then(res => console.log(res))
	Promise { <pending> }
	> { n: 1, nModified: 1, ok: 1 }

	> db.movies.find({title: 'Amadeus'})
	{ "_id" : ObjectId("60b76fa3def5c60b918b0d8c"), "title" : "Amadeus", "year" : 1984, "score" : 9.5, "rating" : "R", "__v" : 0 }
```
- `.updateMany()`		
```
		> Movie.updateMany({title: {$in: ['Amadeus','Stand By Me']}}, {score: 10}).then( res => console.log(res))
		Promise { <pending> }
		> { n: 2, nModified: 2, ok: 1 }

		> db.movies.find({title: {$in: ['Amadeus', 'Stand By Me']}})
		{ "_id" : ObjectId("60b76fa3def5c60b918b0d8c"), "title" : "Amadeus", "year" : 1984, "score" : 10, "rating" : "R", "__v" : 0 }
		{ "_id" : ObjectId("60b7783f856bc80d0d559dae"), "title" : "Stand By Me", "year" : 1986, "score" : 10, "rating" : "R", "__v" : 0 }
```
- `.findOneAndUpdate()`	- will give the object after update was applied
	```
		> Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 7.0}).then(m => console.log(m))
		Promise { <pending> }
		> (node:4213) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
		{ _id: 60b7783f856bc80d0d559dad,
		  title: 'The Iron Giant',
		  year: 1999,
		  score: 7.5,			<--- we get the old value
		  rating: 'PG',
		  __v: 0 }
	```
	- in order to get the new value, we neet to use an option: new= bool, if true, return th modified document rather than the original.
	```
		> Movie.findOneAndUpdate({title: 'The Iron Giant'}, {score: 7.8}, {new: true}).then(m => console.log(m))
		Promise { <pending> }
		> { _id: 60b7783f856bc80d0d559dad,
		  title: 'The Iron Giant',
		  year: 1999,
		  score: 7.8,		<-- the new value appears
		  rating: 'PG',
		  __v: 0 }
	```

# Deleting with Mongoose

- `.remove()` - it's not going to give back any information or documents
```
> Movie.remove({title: 'Amelie'}).then(msg => console.log(msg))
Promise {
  <pending>}
> (node:4213) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
{ n: 1, ok: 1, deletedCount: 1 }
```
- `.deleteMany()`
```
		> Movie.deleteMany({year: {$gte: 1999}}).then(msg => console.log(msg))
		Promise {
		  <pending>}
		> { n: 2, ok: 1, deletedCount: 2 }
```
- `.findOneAndDelete()`
```
		> Movie.findOneAndDelete({title: 'Alien'}).then(m => console.log(m))
		Promise {
		  <pending>}
		> { _id: 60b7783f856bc80d0d559dac,
		  title: 'Alien',
		  year: 1979,
		  score: 8.1,
		  rating: 'R',
		  __v: 0 }
```

# Mongoose Schema Validations

- documentation:[Mongoose Schema Types](https://mongoosejs.com/docs/schematypes.html)
```js
//product.js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NOO, ERROR!")
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String]
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product ({name: 'Mountain Bike', price: 599, categories: ['Cycling', 'Safety']})
bike.save()
.then(data => {
    console.log('It worked!');
    console.log(data);
})
.catch(err => {
    console.log('Oh noo, error');
    console.log(err.errors.name.properties.message);
})
```
```
$ node product.js 
CONNECTION OPEN!!!
It worked!
{ qty: { online: 0, inStore: 0 },
  onSale: false,
  categories: [ 'Cycling', 'Safety' ],
  _id: 60b7b4bfb875a02093cea464,
  name: 'Mountain Bike',
  price: 599,
  __v: 0 }
```
- when you want to update something, you need to specify that we want to still apply the validations using option `runValidators: true`
```js
		const Product = mongoose.model('Product', productSchema);

		Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -100}, {new: true, runValidators: true})
		.then(data => {
		    console.log('It worked!');
		    console.log(data);
		})
		.catch(err => {
		    console.log('Oh noo, error');
		    console.log(err.errors.name.properties.message);
		})
```
- validation errors:
```js
		const productSchema = new mongoose.Schema({
    		price: {
    		    type: Number,
    		    required: true,
    		    min: [0, 'Price must be positive!']    //<--- the error will be the custom string provided
    		},

- validation enum:
		size: {
		        type: String,
		        enum: ['S', 'M', 'L']   //<--- the value needs to be one of the list provided
		    }
```

# Model Instance Methods

- Instances of Models are documents
- Documents have many of their own built-in instance methods. We may also define our own custom document instance methods.
- instance methods operate on individual instances of a model (the keyword this reffers to that particular product)
```js
		//product.js
		[..]
		productSchema.methods.greet = function() {			//<-- we define 'greet' method
		    console.log("Hello!")
		}
		const Product = mongoose.model('Product', productSchema);
```
```
		$ node
		> .load product.js
		> const p =new Product({name: 'bike bag', price: 10})
		undefined
		> p
		{ qty: { online: 0, inStore: 0 },
		  onSale: false,
		  categories: [],
		  _id: 60b7bea07ee09822d1abdb23,
		  name: 'bike bag',
		  price: 10 }
		> p.greet
		[Function]
		> p.greet()
		Hello!
		undefined
```
- we can create a function
	```js
		//product.js
		[..]
		productSchema.methods.greet = function() {
		    console.log("Hello!")
		    console.log(`- from ${this.name}`)   <--- this refers to foundProduct
		}

		const Product = mongoose.model('Product', productSchema);

		const findProduct = async () => {
		    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
		    foundProduct.greet();
		}

		findProduct();
	```
	```
		$ node product.js 
		CONNECTION OPEN!!!
		Hello!
	```
	- from Mountain Bike
- toggle on sale method:
```js
		//product.js
		productSchema.methods.toggleOnSale = function() {
		    this.onSale = !this.onSale;		<-- set it equal to the opposite
		    this.save();
		}

		const Product = mongoose.model('Product', productSchema);

		const findProduct = async () => {
		    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
		    console.log(foundProduct)
		    await foundProduct.toggleOnSale();
		    console.log(foundProduct)
		}

		findProduct();
```
```
		$ node product.js 
		CONNECTION OPEN!!!
		{ qty: { online: 0, inStore: 0 },
		  onSale: false,							<-- it started as false
		  categories: [],
		  _id: 60b7aeb7e9484e1fa2c5ee00,
		  name: 'Mountain Bike',
		  price: 599,
		  __v: 0 }
		{ qty: { online: 0, inStore: 0 },
		  onSale: true,								<-- now it's true
		  categories: [],
		  _id: 60b7aeb7e9484e1fa2c5ee00,
		  name: 'Mountain Bike',
		  price: 599,
		  __v: 0 }
```
- add new categories:
```js
		//product.js
		productSchema.methods.toggleOnSale = function() {
		    this.onSale = !this.onSale;
		    return this.save();
		}

		productSchema.methods.addCategory = function(newCat) {
		    this.categories.push(newCat);
		    return this.save();
		}

		const Product = mongoose.model('Product', productSchema);

		const findProduct = async () => {
		    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
		    console.log(foundProduct)
		    await foundProduct.toggleOnSale();
		    console.log(foundProduct)
		    await foundProduct.addCategory('Outdoors')
		    console.log(foundProduct)
		}

		findProduct();
```
```
		$ node product.js 
		CONNECTION OPEN!!!
		{ qty: { online: 0, inStore: 0 },
		  onSale: false,
		  categories: [],
		  _id: 60b7aeb7e9484e1fa2c5ee00,
		  name: 'Mountain Bike',
		  price: 599,
		  __v: 3 }
		{ qty: { online: 0, inStore: 0 },
		  onSale: true,
		  categories: [],
		  _id: 60b7aeb7e9484e1fa2c5ee00,
		  name: 'Mountain Bike',
		  price: 599,
		  __v: 3 }
		{ qty: { online: 0, inStore: 0 },
		  onSale: true,
		  categories: [ 'Outdoors' ],
		  _id: 60b7aeb7e9484e1fa2c5ee00,
		  name: 'Mountain Bike',
		  price: 599,
		  __v: 4 }
```

# Model Static Methods

- we usually use static methods on the model to do fancy ways of findings, updating, creating or deleting things. 
- They are built on top of existing model methods like Product.find
- in a static method, the keyword this reffers to the entire model
- we need to use 'statics' object:
```js
//product.js
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0})		//<-- this in refering to the model, which in our case is Product
}
//findProduct();	<--we comment this line

Product.fireSale().then(res => console.log(res))
```
```
$ node product.js
CONNECTION OPEN!!!
{ n: 4, nModified: 0, ok: 1 }

$mongo
> use shopApp
switched to db shopApp
> db.products.find()
{ "_id" : ObjectId("60b7aeb7e9484e1fa2c5ee00"), "name" : "Mountain Bike", "price" : 0, "__v" : 6, "categories" : [ "Outdoors", "Outdoors", "Outdoors", "Bla", "Bla" ], "onSale" : true, "qty" : { "inStore" : 0, "online" : 0 } }
{ "_id" : ObjectId("60b7b39eb7748520479c6b9e"), "onSale" : true, "categories" : [ "Cycling", "Safety" ], "name" : "Mountain Bike", "price" : 0, "__v" : 0 }
{ "_id" : ObjectId("60b7b4b740b99520693646d1"), "onSale" : true, "categories" : [ "Cycling", "Safety" ], "name" : "Mountain Bike", "price" : 0, "__v" : 0 }
{ "_id" : ObjectId("60b7b4bfb875a02093cea464"), "qty" : { "online" : 0, "inStore" : 0 }, "onSale" : true, "categories" : [ "Cycling", "Safety" ], "name" : "Mountain Bike", "price" : 0, "__v" : 0 }
```

# Mangoose Virtuals

- Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
- The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
- documentation: [Mongoose Virtuals](https://mongoosejs.com/docs/guide.html#virtuals)
- using `get `
```js
		//person.js
		const personSchema = new mongoose.Schema({
		    first: String,
		    last: String
		})

		personSchema.virtual('fullName').get(function () {
		    return `${this.first} ${this.last}`
		})

		const Person = mongoose.model('Person', personSchema);
```
- it will behave as if it's an actual property
```
		$ node
		> .load person.js
		> CONNECTION OPEN!!!
		> const tammy = new Person({first: 'Tammy', last: 'Chow'})
		undefined
		> tammy
		{ _id: 60b874b6e9d52c0c2bfcd5e2, first: 'Tammy', last: 'Chow' }
		> tammy.fullName		<--- we have the property fullName, but it didn't come from mongo
		'Tammy Chow'
		> tammy.save()

		$ mongo
		> show collections
		people
		products
		> db.people.find()
		{ "_id" : ObjectId("60b874b6e9d52c0c2bfcd5e2"), "first" : "Tammy", "last" : "Chow", "__v" : 0 }		<-- these is no fullname
```
- using `set`:
```js
		//person.js
		personSchema.virtual('fullName').
		get(function () { return `${this.first} ${this.last}` }).
		set(function (v) {
		    this.name.first = v.substr(0, v.indexOf(' '));
		    this.name.last = v.substr(v.indexOf(' ') + 1);
		});
```

# Mongoose Middleware

- documentation: [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html)
- Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. 
- Middleware is specified on the schema level and is useful for writing plugins.
- `.pre` middleware functions are executed one after another, when wach middleware calls next.
- `.post` middleware are executed after the hooked method and all of its pre middleware have completed
```js
		//person.js
		personSchema.pre('save', async function () {
		    console.log("About to save!")
		})

		personSchema.post('save', async function () {
		    console.log("Just saved!")
		})
```
```
$ node
$ .load person.js
> const k = new Person({first: 'Kristen', last: 'Sun'})
undefined
> k.save()
Promise {<pending>}
> About to save!
Just saved!
```

# Mongoose with Express

- basic setup:
```
		$ npm init -y
		$ npm i express ejs mongoose
		$ touch index.js
		$ ls
		index.js  node_modules  package.json  package-lock.json
		$ mkdir views
```
```js
		// cat index.js
		const express = require('express');
		const app = express();
		const path = require('path');
		const mongoose = require('mongoose')

		mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
		    console.log("MONGO CONNECTION OPEN!!!")
		})
		.catch(err => {
		    console.log("OH NOO, MONGO ERROR!")
		    console.log(err)
		})

		app.set('views', path.join(__dirname, 'views'));
		app.set('view enginer', 'ejs');

		app.get('/dog', (req,res) => {
		    res.send('WOOF!')
		})

		app.listen(3000, () => {
		    console.log('App is listening on port 3000');
		})
```
- creating our model:
```
		$ mkdir models
		$ cd models
		$ touch product.js
```
```js
		// $ cat product.js
		const mongoose = require('mongoose')

		const productSchema = new mongoose.Schema({
		    name: {
		        type: String,
		        required: true
		    },
		    price: {
		        type: Number,
		        required: true,
		        min: 0
		    },
		    category: {
		        type: String,
		        lowercase: true,
		        enum: ['fruit', 'vegetable', 'dairy']
		    }
		})

		const Product = mongoose.model('Product', productSchema);

		module.exports = Product;
```
```
		$ cd ..
		$ touch seeds.js
```
```js
		// $ cat seeds.js
		const mongoose = require('mongoose')
		const Product = require('./models/product');

		mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
		    console.log("MONGO CONNECTION OPEN!!!")
		})
		.catch(err => {
		    console.log("OH NOO, MONGO ERROR!")
		    console.log(err)
		})

		// const p = new Product({
		//     name: 'Ruby Grapefruit',
		//     price: 1.99,
		//     category: 'fruit'
		// })

		// p.save().then(p => {
		//     console.log(p)
		// })
		// .catch(e => console.log(err))

		const seedProducts = [
		    {
		        name:'Fairy Eggplant',
		        price:1.00,
		        category:'vegetable'
		    },
		    {
		        name:'Organic Goddess Melon',
		        price:4.99,
		        category:'fruit'
		    },
		    {
		        name:'Organic Mini Seedless Watermelon',
		        price:3.99,
		        category:'fruit'
		    },
		    {
		        name:'Organic Celery',
		        price:1.50,
		        category:'vegetable'
		    },
		    {
		        name:'Chocolate Whole Milk',
		        price:2.69,
		        category:'dairy'
		    }
		]
		Product.insertMany(seedProducts)
		.then(res => {
		    console.log(res)
		})
		.catch(e => {
		    console.log(e)
		})
```
```
		$ mongo
		 show dbs
		admin          0.000GB
		animalShelter  0.000GB
		config         0.000GB
		farmStand      0.000GB
		local          0.000GB
		movieApp       0.000GB
		shopApp        0.000GB
		> use farmStand
		switched to db farmStand
		> show collections
		products
		> db.products.find()
		{ "_id" : ObjectId("60b8f551ea6b2a0edc6cafe6"), "name" : "Ruby Grapefruit", "price" : 1.99, "category" : "fruit", "__v" : 0 }
		{ "_id" : ObjectId("60b8f84d9941b20f93a44769"), "name" : "Fairy Eggplant", "price" : 1, "category" : "vegetable", "__v" : 0 }
		{ "_id" : ObjectId("60b8f84e9941b20f93a4476a"), "name" : "Organic Goddess Melon", "price" : 4.99, "category" : "fruit", "__v" : 0 }
		{ "_id" : ObjectId("60b8f84e9941b20f93a4476b"), "name" : "Organic Mini Seedless Watermelon", "price" : 3.99, "category" : "fruit", "__v" : 0 }
		{ "_id" : ObjectId("60b8f84e9941b20f93a4476c"), "name" : "Organic Celery", "price" : 1.5, "category" : "vegetable", "__v" : 0 }
		{ "_id" : ObjectId("60b8f84e9941b20f93a4476d"), "name" : "Chocolate Whole Milk", "price" : 2.69, "category" : "dairy", "__v" : 0 }
```	
- updating products:
	```js
		// $ cat index.js
		[..]
		app.get('/products/:id/edit', async (req,res) => {
		    const {id} = req.params;
		    const product =  await Product.findById(id)
		    res.render('products/edit', {product})
		})

		app.put('/products/:id', async (req, res) => {
		    const {id} = req.params;
		    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
		    console.log(req.body);
		    res.redirect(`/products/${product._id}`)

		})
	```
	```html
		<!-- $ cat edit.ejs -->
		<body>
		    <h1>Edit A Product</h1>
		    <form action="/products/<%=product._id%>?_method=PUT" method="POST">		<!-- we don't have PUT method, so we need to use method-override -->
		        <label for="name">Product Name</label>
		        <input type="text" name="name" id="name" placeholder="product name" value="<%= product.name %> ">
		        <label for="price">Price (Unit)</label>
		        <input type="number" name="price" id="price" placeholder="price" value="<%= product.price %>">
		        <label for="category">Select Category</label>
		        <select name="category" id="category">
		            <option value="fruit">fruit</option>
		            <option value="vegetable">vegetable</option>
		            <option value="dairy">dairy</option>
		        </select>
		        <button>Edit Product</button>
		    </form>
		    <a href="/products/<%=product._id%> ">Cancel</a>
		</body>
	```
	- documentation: [Method Override](https://www.npmjs.com/package/method-override)
	- `$ npm i method-override`
	- then we can tell express to use it by adding the following lines to index.js:
	```js
			const methodOverride = require('method-override')
			app.use(methodOverride('_method'));
	```
- tangent on Category Selector:
	- we need to edit edit.js so that the type is correctly shown:
	```js
		//edit.ejs
		<select name="category" id="category">
            <option value="fruit" <%= product.category === 'fruit' ? 'selected': ''%> >fruit</option>		//<--- if the product cateogry is fruit, add selected, otherwise add nothing
            <option value="vegetable" <%= product.category === 'vegetable' ? 'selected': ''%> >vegetable</option>
            <option value="dairy" <%= product.category === 'dairy' ? 'selected': ''%> >dairy</option>
        </select>
	```
	- another option is to make a loop:
	```js
		//in index.js
		const categories = ['fruit', 'vegetable', 'dairy'];
		[..]
		app.get('/products/new', (req,res) => {
		    res.render('products/new', {categories})		//<-- pass through categories
		})
		app.get('/products/:id/edit', async (req,res) => {
		    const {id} = req.params;
		    const product =  await Product.findById(id)
		    res.render('products/edit', {product, categories})
		})

		//new.ejs
		<select name="category" id="category">
            <% for(let category of categories) { %>
                <option value="<%= category %>"><%= category %></option>
            <% } %> 
        </select>
	```
- delete products
	- we cannot make a delete request from an html form in the browser, but we can fake it; we can send a post request and add method_override
	```html
		<!-- show.ejs -->
		<form action="/products/<%=product._id%>?_method=DELETE" method="POST">
    	    <button>Delete</button>
    	</form>
	```
	```js
		//index.js
		app.delete('/products/:id', async(req, res) => {
		    const {id} = req.params;
		    const deletedProduct = await Product.findByIdAndDelete(id);
		    res.redirect('/products');

		})
	```
- filtering by category
	```html
		//show.ejs
		<ul>
    	    <li>Price: $<%= product.price %> </li>
    	    <li>Category: <a href="/products?category=<%=product.category%>"><%= product.category %></a> </li>
    	</ul>
	```
	```js
		//index.js
		app.get('/products', async (req,res) => {
		    const {category} = req.query;
		    if(category){
		        const products = await Product.find({category})
		        res.render('products/index', {products, category})
		    } else {
		        const products = await Product.find({})
		        res.render('products/index', {products, category: 'All'})
		    }
		})
	```
	```html
		//index.ejs
		<% if (category !== 'All') { %>
    	    <a href="/products/">All products</a>
    	<% } %> 
	```


# Data Relationships With Mongo

## One to Few

- embed the data directly in the document
```
{
	name: 'Tommy Cash',
	savedAddresses: [
		{street: 'Rahukohtu 3', city: 'Tallium', country: 'Estonia'},
		{street: 'Rahukohtu 5', city: 'Tallium', country: 'Estonia'},
	]
}
```
- yelpCamp example:
```js
		//Models/user.js
		const mongoose = require('mongoose');

		mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
		    console.log("MONGO CONNECTION OPEN!!!")
		})
		.catch(err => {
		    console.log("OH NOO, MONGO ERROR!")
		    console.log(err)
		})

		const userSchema = new mongoose.Schema({
		    first: String,
		    last: String,
		    addresses: [
		        {
		            _id: {id: false},
		            street: String,
		            city: String,
		            state: String,
		            country: String
		        }
		    ]
		})

		const User = mongoose.model('User', userSchema);

		const makeUser = async () => {
		    const u = new User({
		        first: 'Harry',
		        last: 'Potter',
		    })
		    u.addresses.push({
		        street: '123 Sesamee Street',
		        city: 'New York',
		        state: 'NY',
		        country: 'USA'
		    })
		    const res = await u.save()
		    console.log(res)
		}

		const addAddress = async(id) => {
		    const user = await User.findById(id);
		    user.addresses.push(
		        {
		            street: '99 3rd St.',
		            city: 'New York',
		            state: 'NY',
		            country: 'USA'
		        }
		    )
		    const res = await user.save()
		    console.log(res);
		}

		//makeUser()
		addAddress('60f83062667eff8a009b5979')
```

## One to Many

- one option is to store your data separately, but then store references to document ID's somewhere inside the parent:
```
		{
			farmName: 'Full Belly Farms',
			location: 'Guinda, CA',
			produce: [
				ObjectID('2345678934567'),
				ObjectID('2345749843566'),
				ObjectID('2345676789098'),
			]
		}
```
- Documentation: [Mongoose Populate](https://mongoosejs.com/docs/populate.html)
- example:
```js
		//Models/farm.js
		const mongoose = require('mongoose');
		const {Schema} = mongoose;

		mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
		    console.log("MONGO CONNECTION OPEN!!!")
		})
		.catch(err => {
		    console.log("OH NOO, MONGO ERROR!")
		    console.log(err)
		})

		const productSchema = new Schema({
		    name: String,
		    price: Number,
		    season: {
		        type: String,
		        enum: ['Spring', 'Summer', 'Fall', 'Winter']
		    }
		});

		const farmSchema = new Schema({
		    name: String,
		    city: String,
		    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]		//<--- we need to have that reference, to make the connections
		});

		const Product = mongoose.model('Product', productSchema);
		const Farm = mongoose.model('Farm', farmSchema);

		// Product.insertMany([
		//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
		//     {name: 'Sugar Baby Watermelon', price: 5.99, season: 'Summer'},
		//     {name: 'Asparagus', price: 3.99, season: 'Spring'}
		// ])

		// const makeFarm = async () => {
		//     const farm = new Farm({name: 'Full Belly Farms', city: 'Guinda, CA'});
		//     const melon = await Product.findOne({name: 'Goddess Melon'});
		//     farm.products.push(melon)
		//     await farm.save()
		//     console.log(farm);
		// }

		// makeFarm();

		const addProduct = async () => {
		    const farm = await Farm.findOne({name: 'Full Belly Farms'});
		    const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'});
		    farm.products.push(watermelon)
		    await farm.save();
		    console.log(farm);
		}

		addProduct();
```

## Mongoose Populate

- `populate` = is a method which lets you reference documents in other collections
- Documentation: [Populate](https://mongoosejs.com/docs/populate.html)
- before we use `populate`:
```js
		//farm.js
		Farm.findOne({name: 'Full Belly Farms'}).then(farm => console.log(farm))
```
```
		//node console:
		$ node farm.js
		MONGO CONNECTION OPEN!!!
		{ products: [ 60f908f37610330b7cbd16fc, 60f908f37610330b7cbd16fd ],			<-- we see only the ObjectIDs
		  _id: 60f90f308068260cdd9be993,
		  name: 'Full Belly Farms',
		  city: 'Guinda, CA',
		  __v: 1 }
```
- after we use `populate`:
```js
//farm.js
		Farm.findOne({name: 'Full Belly Farms'})
    		.populate('products')
    		.then(farm => console.log(farm))
```
```
		//node console:
		$ node farm.js
		MONGO CONNECTION OPEN!!!
		{ products:
		   [ { _id: 60f908f37610330b7cbd16fc,		<--- we see all info about products
		       name: 'Goddess Melon',
		       price: 4.99,
		       season: 'Summer',
		       __v: 0 },
		     { _id: 60f908f37610330b7cbd16fd,
		       name: 'Sugar Baby Watermelon',
		       price: 5.99,
		       season: 'Summer',
		       __v: 0 } ],
		  _id: 60f90f308068260cdd9be993,
		  name: 'Full Belly Farms',
		  city: 'Guinda, CA',
		  __v: 1 }
```

## One to "Bajillions"

- with thousands or more documents, it's more efficient to store a reference to the parent on the child document.
```
		{
			tweetText: 'lol that was so funny',
			tags: ['stupid', 'funny', 'yolo'],
			user: ObjectId('23456789678')
		}
```
- example:
```js
		const mongoose = require('mongoose');
		const {Schema} = mongoose;

		mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
		    console.log("MONGO CONNECTION OPEN!!!")
		})
		.catch(err => {
		    console.log("OH NOO, MONGO ERROR!")
		    console.log(err)
		})

		const userSchema = new Schema({
		    username: String,
		    age: Number
		})

		const tweetSchema = new Schema({
		    text: String,
		    likes: Number,
		    user: {type: Schema.Types.ObjectId, ref: 'User'}
		})

		const User = mongoose.model('User', userSchema);
		const Tweet = mongoose.model('Tweet', tweetSchema);

		// const makeTweets = async() => {
		//     //const user = new User({username: 'chickenfan99', age: 61});
		//     const user = await User.findOne({username: 'chickenfan99'})
		//     //const tweet1 = new Tweet({text: 'omg I love my chicken family!', likes: 104});
		//     const tweet2 = new Tweet({text: 'bla bla bla', likes: 4});
		//     tweet2.user = user;
		//     //user.save();
		//     tweet2.save();
		// }

		// makeTweets();

		const findTweet = async () => {
		    //const t = await Tweet.findOne({}).populate('user', 'username')
		    const t = await Tweet.find({}).populate('user')
		    console.log(t);
		}

		findTweet();
```

# Mongo Schema Design

- documentation: [Mongo Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3)
- denormalize = duplicate data in multiple places


# Mongo Relationships With Express

- deletion Mongoose Middleware:
	- documentation (https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete) 
	- checking the documentation we can see that `Model.findByIdAndDelete()` triggers the following middleware: `findOneAndDelete()`
	- `findOneAndDelete` is a query middleware ( `this` refers to the query)
- `Pre` middleware functions are executed one after another, when wach middleware calls next
- in mongoose 5.x, instead of calling `next()` manually, you can use a function that returns a promise. In particular, you can use `async/await`
- `$pull` operator in Mongo: removes from an existing array all instances of a value or values that match a specified condition