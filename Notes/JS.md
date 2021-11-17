# Introduction

JavaScript - adds LOGIC and INTERACTIVITY to a page

# Primitives Data Types

- the basic building blocks:
    - numbers
        - JS has one number type
            - positive numbers
            - negative numbers
            - whole numbers (integers)
            - decimal numbers
        - NaN: not a number - is a numeric value that represents something that is not a number (i.e 0/0 ; 1 + NaN)
    - strings
        - single or double quotes are ok
        - concatenation
        - escape character: \
        - string are indexed
        - strings have a lenght property: "hello world".length
        - access individual characters using `{}` and an index:   `"hello"[0]`(<--- h)    `"hello"[4]`(<--- o) 
    - booleans
    - null - intentional absence of any value; must be assigned
    - undefined - variables that do not have an assigned value
    - there are two others: Symbol and BigInt  <--- not communly used    
    - to check the type of a data: `typeof`
    - comments: `//`


# Variables

- containers that store values 
- basic syntax:
        `let yourVariableName = yourValue;`
- they can store all of the values we've seen 
```js
        let name = "Rusty";
        let secretNumber= 73;
```
- recall the stored value by calling the variable name
```js
        let name = "Rusty";
        "hello there " + nume    //"hello there Rusty"
```
- we can update existing Variables (dynamic typing = we can change the type of the variable)
```js
        let name = "Rusty"
        name = "Bob"
```
- var has been replaced with `let` & `const`
- let and const are block scoped (var is scoped to current execution context)
- `const`: cannot be reassigned (not updating the refference, it points to the same object in memory)
- `let`: you can update it at any point

- you can increment or decrement using the following:
```js
        let num = 9;
        num = 10;
        num = num + 2;
        num += 2
        num++           // <--- increment by 1
        num--
```
- variables can change type
- naming conventions:   In JS, identifiers are case-sensitive and can contain Unicode letters, $, _, and digits (0-9), but may not start with a digit


# String Methods

- methods are built-in actions we can perform with individual strings
- they help us search within a string, replacinf part of a string, changing the casing of a string, etc
- syntax:`thing.method()`
```js
                text.toUpperCase()
                text.toLowerCase()
                text.trim()             //<--- trim off any white space at the begining and at the end of a string
```
- you can chain methods: `text.toUpperCase().trim()`
- some methods accept arguments that modify their behavior: `thing.method(arg)`
```js
                let text = 'catdog';
                text.indexOf('cat');    //<--- first matching index
                text.slice(0,5);        //<--- accepts more arguments. It extracts a section of a string and returns it as a new string without modifying the original string
                text.replace('cat', 'snake');   //<--- replace only thr first occurance
```
- `replace()` method = replace the occurrence of any character in a string. 
    - However, the replace() will only replace the first occurrence of the specified character. 
    - To replace all the occurrence you can use the global (g) modifier. 
```js
                function kebabToSnake(name) {
                let newname = name.replace(/-/g, "_");
                return newname
                }
```

# Usefull Methods

- `alert` - it pops up a message to the user
```js
                alert("Hello There");
                alert(32842472);
                alert(198 * 345);
```
- `console.log` - print something to the java script console (if you don't have the console open, you will not see it)
    - ie: `console.log("Hello from the console")`
    - console object accepts other methods: console.warn, console.error
- `prompt` 
    - lets us get input from a user: `prompt("what is your name?")`
    - you can store the user input in a variable: `let userName = prompt("what is your name?");`
    - the value entered by a user is a string, but it can be converted to a number:
    ```js
                let userInput = prompt("please enter a number")         // "97"
                parseInt(userInput)                                     // 97
    ```
- `clear ()`   - to clear console

- in the html file, if you put the script in the header it's going to run first (before the body text)
- it's preferable to put the line at the bottom of the `</body>`, but inside it: `<script src="file.js"></script>`


# String Template Literals

- are strings that allow embedded expressions, which will be evaluated and then turned into a resulting string
    - ie: `I counted ${3 +4} sheep`;      // "I counted 7 sheep"
- in order to work we need to use back-ticks, not single quotes


# Math Object

- contains properties and methods for mathematical constants and functions
```js
        Math.PI //3.141592653589793
        Math.round(4.9) //5     rounding a number
        Math.abs(-456)  //456   absolute value
        Math.pow(2,5)   //32    raises 2 to the 5th power
        Math.floor(3.9999)      //3     removes decimal
        Math.ceil(3.999)        //4
        Math.random();          // <--- gives a random decimal between 0 and 1 (non-inclusive)
```

# Boolean Logic

- everything starts with the idea that a statement is either True or False
- then we can combine those initial statements to create more complex statements that also evaluate to True or False
- comparison/equality operators:
    - `==`  equal to; it performs type coercion, while `===` does not
    ```js
        1 == 1          //true
        1 == '1'        //true
        null == undefined;      //true
        0 == false      //true
    ```
    - `!=` not equal to (does not care about the type)
    - `===` equal value and type
    ```js
        1 === 1         //true
        1 === '1'       //false
        0 === false     //false
    ```
    - `!==` not equal value or equal type
- values that aren't actually true or false, are still inherently "truthly" or "falsey" when evaluated in a boolean context
    - Fasly values: `false`, `0`, `""`, `null`, `undefined`, `NaN`(not a number)
    - Everything else is Truthy
    ```js
                if (undefined){
                        console.log("Truthy")
                } else {
                        console.log("Falsey")          // it's falsey
                }
    ```

# Logical Operators

- AND - `&&`
- OR - `||`
- NOT - `!`


# JS Conditionals

- making decisions with code
- conditional key words:
```js
        if (somecondition){
                //run some code
        }
        else if (otherCondition) {
                //run some code
        }
        else {
                //run some code
        }
```

# Loops

- an infinite loop occurs when the terminating condition never returns false.
- DRY code = Don't Repeat Yourself
- we want to keep our code as DRY as possible. It saves us a lot of time and makes our code cleaner
- `For` Loops:
```js
        for (initialExpression; condition; incrementExpression) {
                //run some code
        }

        for (let i=0; i<=5; i++) {
                console.log("Da ba dee da ba daa");
        }
```
- `While` Loops: it's very similar to an if statement, except it repeats a given block instead of just running it once
```js
        while (someCondition) {
                //run some code
        }

        let count = 0;
        while (count < 10) {
                count++;
                console.log(count);
        }
```
- the `break` keyword: to break from a loop
- `for...of` loop: a way of iterating over arrays or other iterable objects
    - syntax:       
    ```js
        for (variable of iterable) {            // <--- for ( ... of ...) { statement}
                statement
        }
    ```
    - ie:
    ```js
        const num = ['a', 'b', 'c', 'd', 'e'];
        for (let letters of num) {
                console.log(num)
        }
    ```
- iterating over objects:
    - object literals are not iterable
    - you can use `for...in`:
    ```js
        const persons = {
                a: 20,
                b: 45,
                c: 9
                }
        for (let num in persons) {
                console.log(num);    //<--- it will print the keys
                console.log(persons[num]);        //<--- it will print the values
        }
    ```
    - another posibility would be to use: 
    ```js
        Object.keys(persons)
        Object.values(persons)          //<--- returns an array of that object's values
        Object.entries(persons)         //<--- it gives us a nested array of key-value pairs
        let total = 0;
        for (let num of Object.values(persons)) {
                total += num;         //20 + 45 + 9 = 74
        }
    ```

# Arrays

- are data structures
- ordered collections of values
- arrays let us group data together in lists
- arrays are indexed starting at 0. Every slot has a corresponding number
- we can use those indices to retrieve data
- we can add new data
- we can initialize an empty array two ways:
```js
        let friends = []; //no friends
        let friends = new Array()  //uncommon
```
- arrays can hold any type of data
- arrays have a length property
```js
        let nums = [1,2,3];
        nums.lenght     //3
```
- with arrays you can change an entire element, unlike strings
```js
        let colors = ['rad', 'orange'];
        colors[0] = 'red'       //colors will be changed: colors = [ 'red', 'orange']
```
- we cannot compare two arrays using `===` or `==`. The operators compares the references in memory
```js
        [1] === [1]     //false; the content of the arrays is not evaluated

        let nums = [1,2,3];
        let numsCopy = nums;
        nums === numsCopy       //true   when nums changes, numsCopy will change too
```
- arrays + const:
```js
        const nums =[1,2,3];    //the reference cannot be changed, but the content can
        nums.push(4);   //will work
        nums = [1,2,3]  //error
```
- nested arrays: we can store arrays inside other arrays: `gameboard[1][1]`


# Array Methods

- arrays come with a few built-in methods [[Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- `push`/`pop`:
    - `push` = adding something to the very end of an array: `collors.push("green");`
    - `pop` = removes the last element in the array: `colors.pop()`   <--- no argument needed
- `shift`/`unshift`:
    - `shift` = remove the first item in the array: `colors.shift();`  <--- no argument needed
    - `unshift` = add to the front of the array: `colors.unshift("red");`
- `concat`: to merge two or more arrays; does not change the existing array: `const array3 = array1.concat(array2);`
- `includes`: determines wheter an array contains a certain value among its entries, returning true or false
```js
                const array = [1, 2, 3];
                console.log(array.includes(2));
```
- `indexOf`: find the index of an item in an array; `friends.indexOf("Red");` //0
    - it returns te first index at which a given element can be found
    - it returns -1 if the element is not present
- `reverse`: reverses an array in place (it changes the initial array): `array.reverse()`
- `slice`: to copy parts of an array
    - it takes two arguments: where the new array starts and where it ends
    - doing this does not alter the original array
    ```js
          let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
          let citrus = fruits.slice(1, 3)        //citrus contains orange and lemon
    ```
    - you can also `slice()` to copy an entire array (no argument needed)
    ```js
          let nums =[1,2,3];
          let num2 = nums.slice();        //both arrays are [1,2,3]
    ```
- `splice`: to change the contents of an array by removing or replacing existing elements and/or adding new elements in place
    - it takes two or three arguments:      
        - the position of the thing to be deleted
        - a number of how many items to delete after index
        - optional something to insert
    - syntax: `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
    ```js
        const months = ['Jan', 'March', 'April', 'June'];
        months.splice(1, 0, 'Feb')
        months.splice(3,1)
    ```
- `sort`: sorts the elements of an array in place and returns the sorted array.
    - the default sort order is accending, by comparing the sequences of UTF-16 code units values: `months.sort();`
- if we have nested arrays, we can access the ones inside by doing: `arrayname [0] [2]` etc
- `forEach` method:       
    - accepts a callback function. Calls the function once per element in the array
    - built-in way of iterating over an array: `array.forEach(someFunction)`
    ```js
        let colors = ["red", "green", "blue"];
        colors.forEach(function (color) {
        //color is a placeholder, call it whatever you want
        });
    ```
    - `.forEach` takes a callback function, that callback function is expected to have at least 1, but up to 3, arguments. 
    - The arguments are in a specific order:
        - The first one represents each element in the array (per loop iteration) that `.forEach` was called on.
        - The second represents the index of said element.
        - The third represents the array that `.forEach` was called on (it will be the same for every iteration of the loop).
    - You have a couple options when calling `.forEach` on an array:
        - in an anonymous function:
        ```js
                [1,2,3].forEach(function(el, i, arr) {
                  console.log(el, i, arr);
                });
        ```
        - Or you can pass in a pre-written, named function.
        ```js
                function logNums(el, i, arr) {
                  console.log(el, i, arr);
                }
                [1,2,3].forEach(logNums);
        ```
- map method: creates a new array with the results of calling a callback on every element in the array
```js
        const texts = ['lol','omg','ttyl'];
        const caps = texts.map(function(t){
                return t.toUpperCase();
        })
        texts;  // ["lol","omg","ttyl"]
        caps;   // ["LOL","OMG","TTYL"]


        function cleanNames(array) {
            let newArray = array.map(function(n){
                return n.trim();
            });
            return newArray;
        }
```
- filter method: creates a new array with all elements that pass the test implemented by the provided function.
```js
        const nums = [9,8,7,6,5,4,3,2,1];
        const odds = nums.filter(n => {
                return n % 2 === 1;     // our callback returns true or false; if it returns true, n is added to the filtered array
        })

        // [9, 7, 5, 3, 1]

        const smallNums = nums.filter(n => n <5);
        //[4,3,2,1]

        function validUserNames(array) {
            let newArray = array.filter(username => username.length < 10);
            return newArray;
        }
```
- some method (boolean method): similar to every, but returns true if ANY of the array elements pass the test function
```js
        const words = ['dogs', 'jello', 'log', 'cupcake', 'bag', 'wag'];
        
        //Are there any words longer than 4 characters?
        words.some(word => {
                return word.lenght > 4;
        })      // true

        //Do any words start with 'Z'?
        words.some(word => word[0] === 'Z');    // false

        //Do any words contain 'cake'?
        words.some(word => word.includes('cake'));       // true
```
- every method: tests whether ALL elements in the array pass the provided function. It returns a Boolean value
```js        
        const words = ['dog', 'dig', 'log', 'bag', 'wag'];
        
        words.every(word => {
                return word.lenght === 3;
        })      // true

        words.every(word => word[0] === 'd');    // false

        words.every(word => {
                let last_letter = word[word.length - 1];
                return last_letter === 'g'
        })      // true

        function allEvens(array) {
            if (array.every(num => num % 2 === 0)){
                return true;
            } return false;
        }
```
- reduce method: executes a reducer function on each element of the array, resulting in a single value
    - we can specify a starting point for our accumulator parameter
```js
        // Summing an array
        const sum = [3, 5, 7, 9].reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
        })

        // old version
        let nums = [3, 5, 7, 9];
        let sum = 0;
        for (let num of nums) {
                sum += num;
        }
        console.log(sum)

        // Specifying a starting point with a second parameter for reduce
        const sum = [3, 5, 7, 9].reduce((accumulator, currentValue) => accumulator + currentValue, 100);        // 124
```


# Arrow Functions

- syntactically compact alternative to a regular function expression
```js
        const square = (x) => {
                return x*x;
        }

        const sum = (x,y) => {
                return x+y;
        }
```
- implicit return:
```js
        const isEven = function (num) {         // regular function expression
                return num % 2 === 0;
        }

        const isEven = (num) => {               // arrow function with parens around param
                return num % 2 === 0;
        }

        const isEven = num => {                 // no parens around param
                return num % 2 === 0;
        }

        const isEven = num => (                 // implicit return only work on a single expression to be evaluated
                num % 2 === 0
        );

        const isEven = num => num % 2 === 0;    // one-liner implicit return
```        
- the keyword `this` behaves differently in an arrow function compared to a regular function:
```js
        const person = {
                firstName: 'Viggo',
                lastName: 'Mortensen',
                fullName: function(){ return `${this.firstName} ${this.lastName}`}
        }
        person.fullName()       //"Viggo Mortensen"

        // If I replace it with an arrow function:
        const person = {
                firstName: 'Viggo',
                lastName: 'Mortensen',
                fullName: () => {
                        return `${this.firstName} ${this.lastName}`      
        }
        person.fullName()       //"undefined undefined"

        // the keyword 'this' is refering to the scope that it was created in, in this case Window object.
                }

        // Example:
        const person = {
                firstName: 'Viggo',
                lastName: 'Mortensen',
                fullName: () => {
                        return `${this.firstName} ${this.lastName}`  
                        },
                shoutName: function (){
                    console.log(this.firstName)
                    setTimeout( function () {
                        console.log(this);
                        console.log(this.fullName())        //<--- reffers to setTimeout; not working
                    },3000)
                    },
                shoutName2: function (){
                    console.log(this.firstName)
                    setTimeout( () => {
                        console.log(this);
                        console.log(this.fullName())     //<--- reffers to person; working
                    },3000)
                }
        }
        person.shoutName2();
```

# Object Literals

- is a data structure
- store data in key-value pairs (named properties)
- objects have no order (unlike arrays)
```js
        var name = {
             key: value,
             key2: value2,
             key3: value3   
        };
```
- there are two choises to retrieve data: 
    - bracket: `console.log(name["key"]);`
    - dot notation: `console.log(name.key);`
- every key is turned into a string
- there are a few differences between them:
    - you cannot use dot notation if the property(key) starts with a number
        `someObject.1blah` //<--invalid
    - you can lookup using a variable with bracket notation 
    ```js
        let str = "name";  
        someObject.str   //<-- doesn't look for "name" 
        someObject[str]  //<-- does evaluate str and looks for "name"
    ```
    - you cannot use dot notation for property names with spaces
    ```js
            someObject.fav color   //<--- invalid
            someObject["fav color"]   //<--- valid
    ```
- to update data we need to access a property and reassign it
```js
        person.city = "London";
        person["age"] += 1;
```
- there are a few modes of initializing objects:
    - make an empty object and then add to it:
    ```js
        let person = {}
        person.name = "Travis";
        person.age = 21;
        person.city = "LA";
    ```
    - all at once:
    ```js
        let person = {
                name: "Travis";
                age: 21;
                city: "LA";
        }
    ```
    - other way:
    ```js
        let person = new Object();
        person.name = "Travis";
        person.age = 21;
        person.city = "LA";
    ```
- objects can hold any sort of data


# JS Functions

- functions = let us wrap bits of code up into REUSABLE procedures.
    - they are the fundamental building blocks of JS
- declare a function:
```js
        function funcName() {
                console.log("hello world");
        }
```
- then call it:
```js
        doSomething();
        doSomething();
        doSomething();
```
- arguments: we use them if we want to write functions that take inputs (is called parameter inside of a function)
- functions can have as many arguments as needed
- the `return` keyword: when we want a function to send back an output value
        - can be stored in a variable
        - stops the execution of a function
```js
        function square(x) {
                console.log(x*x);     //<---in this case the value is not stored. it is only print in the console log, but it's undefined
        }

        function square(x) {
                return x*x;           //<---in this case we have an output (a return value that can be further used)
        }
        let result = square(104);
```
- when return is encountered in a function, it stops the execution of that function.
- the difference between a Function Declaration and a Function Expression: [Difference](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
```js
        //Function Declaration
        function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
        }
        //Function Expression
        let capitalize = function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
        }
```
- no matter how you name a function, be it with a variable in a function expression or directly in a function declaration, 
    - it can be overwritten if you assign that same variable to something else, later in your code.
- functions are just values in JS


# Function Scope

- scope = the context that code is executed in
- the location where a variable is defined dictates where we have access to that variable
- some viariables, etc are visible only inside a function, outside they are not defined
- a function has it's own scope, it's own variables
- scope is not shared between functions
```js
        let phrase = "hi there!"
        function doSomething() {
                let phrase = "goodbye!";    // in this case the phrase inside the function will be goodbye, but the phrase outside the function will remain 'hi there', because we used let, which made a new variable, not using the one outside the function
                console.log(phrase);
        }

        let phrase = "hi there!"
        function doSomething() {
                phrase = "goodbye!";     // in the second case, we  don't use let, so the value will change to "goodbye"
                console.log(phrase);
        }
```
- lexical scope: an inner function nested inside some parent function has access to the scope/variables 
    - defined in the scope of that outter function


# Block Scope

- if our variables are declared inside of a block, those variables exist only within that block
- blocks: conditionals, loops
```js
        let radius = 8;
        if (radius >0) {                    //<-- this is a block
                const PI = 3.14159;
                let msg = "HIII!";
        }

        console.log(radius)     // 8
        console.log(PI)         // undefined
        console.log(msg)        // undefined variable
```

# High order Functions

- functions that operate on/with other functions
- functions that either accept other functions as an argument or they return another function
- accept other functions:
```js
        function sing() {
                console.log("twinkle twinkle...")
                console.log("how i wonder...")
        }

        setInterval(sing, 1000)         //<-------- this function will call whatever is in sing at an interval of 1000 mseconds if we don't want to give a function we can do the following:

        setInterval(function(){                         //<-----  defining a function inline; we cannot call it outside setInterval; it's just a way to pass code into setInterval
                console.log("I am an anonymous function");
                console.log("this is awesome);
        },2000);
```
- return a function:
```js
        function makeMisteryFunc(){
                const rand = Math.random();
                if (rand > 0.5) {
                        return function() {
                                console.log("Good function")  
                        }
                } else {
                        return function() {
                                alert("Bad function")
                        }
                }
        }

const mystery = makeMiseryFunc()        //the variable 'mystery holds a function and it can be executed
mistery()                               // returns one of the two functions
```
- ie:    
```js
        function makeBetweenFunc(min, max) {
        return function (num) {
                return num >= min && num <=max;
                }
        }

const isChild = makeBetweenFunc(0,18)          // the variable holds a function
const isAdult = makeBetweenFunc(19,60)
isChild(8)                                     // returns true
isChild(40)                                     // returns false
```

# Defining Methods

- we can add functions as properties on objects;  we call them methods.
- method = a function that is a property inside of an object
- adding methods to objects:
```js
        let obj = {
                name: "Bob",
                square: function(num){
                        return num*num;
                }
        }

        obj.square(2);          // 4  <--- in order to call the function
```
- ie:
```js
        let dogSpace = {};
        dogspace.speak = function(){
                return "WOOF!";
        }
        let catSpace = {};
        catspace.speak = function(){
                return "MEOW!";
        }

        dogSpace.speak()
        catSpace.speak()          //<--- to return the values
```
- shorthand to add methods:
```js
        const math = {
                blah: "hi!",
                add(x,y) {                   //<--- we don't need the 'function' keyword
                        return x + y;
                },
                multiply(x,y) {
                        return x * y;
                }
        }
        math.add(50,60)         //110
```
- the keyword `this` in methods: use the keyword `this` to access other properties on the same object.
```js
        const person = {
                first: 'Robert',
                last: 'Hfjsfss',
                fullname() {
                        return `${this.first} ${this.last}`
                }
        }
        person.fullName();      // "Robert Hfjsfss"
        person.last = "Plant";
        person.fullName();      //"Robert Plant"
```
- the value of `this` depends on the invocation context of the function it is used in. ( it depends on how you call the function)
```js
        const cat = {
                name: 'Blue',
                meow() {
                        console.log(`${this.name} says MEOWW`);
                }
        }

        const meow2 = cat.meow;

        cat.meow()      // returns Blue says MEOWW; the keyword 'this' refers to cat object (the object to the left of the cat)
        meow2()         // returns says MEOWW; is invoked differently; the keywork 'this' reffers to the 'window' object (top level object)
```

# Try/Catch Statements

- cathing errors and preventing them from breaking/stopping the execution of our code
```js
try {
        hello.toUpperCase();
} catch {
        console.log("Error!!!!");
}
console.log("After");           // this code will run; if we didn't use try/catch this would have not run

function yell(msg) {
        try {
                console.log(msg.toUpperCase().repeat(3));
        } catch (e) {
                console.log(e);
                console.log("Please pass a string next time!");
        }
}
```

# Usefull Functions

- `setTimeout`: sets a timer which executes a function or specified piece of code once the timer expires.
    - syntax: 
        - `var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]);`
        - `var timeoutID = scope.setTimeout(function[, delay]);`
        - `var timeoutID = scope.setTimeout(code[, delay]);`
        ```js    
        setTimeout( () => {
                console.log("HELLO!")
        },3000)
        ```
- `setInterval`: repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
    - It returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval().

    - syntax:       
        - `var intervalID = scope.setInterval(func, [delay, arg1, arg2, ...]);`
        - `var intervalID = scope.setInterval(function[, delay]);`
        - `var intervalID = scope.setInterval(code, [delay]);`
        ```js
        const id = setInterval( () => {
                console.log(Math.random())
        },2000)
        ```
- `clearInterval`: cancels a timed, repeating action which was previously established by a call to setInterval().
    - syntax: `scope.clearInterval(intervalID)`
    - ie: `clearInterval(id);`


# Newer JS Features

- default params:
```js
        //the old way
        function multiply(a,b) {
                b = typeof b !== 'undefined' ? b : 1;
                return a*b;
        }

        multiply(7); //7
        multiply(7,3);  //21

        // the new way
        function multiply(a, b = 1) {       //<--- default parameters cannot come first (the order matters)
                return a * b;
        }
```
- spread: spread syntax allows an iterable such as an array to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

- spread in function calls: expands an iterable (array, string, etc) into a list of arguments
```js
        const nums = [9, 3, 2, 8];
        Math.max(nums);         //NaN
        //Use spread!
        Math.max(...nums);      //67
        // Same as calling Math.max(9,3,2,8)
```
- spread with array literals:   create a new array using an existing array. Spreads the elements from one array into a new array
```js
        const num1 = [1, 2, 3];
        const num2 = [4, 5, 6];
        [...num1, ...num2];     //[1, 2, 3, 4, 5, 6]
        ['a', 'b', ...num2];    //["a", "b", 4, 5, 6]
        [...num1, ...num2, 7, 8, 9];    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
- spread with object literals:  copies properties from one object into another object literals
```js
        const feline = { legs: 4, family: 'Felidae'};
        const canine = { family: 'Caninae', furry: true};
        const dog = { ...canine, isPet: true};  //{ family: 'Caninae', furry: true, isPet: true}
        const catDog = {...feline, ...canine};  //{ legs: 4, family: 'Caninae', furry: true}    <--- when there is a conflict, order matters

        {...[2, 4, 6]}  //{0: 2, 1: 4, 2: 6}
        {..."HI"}       //{0: "H", 1: "I"}
```
- the arguments object: - available inside every function
    - It's an array-like object: 
        - has a length property
        - does not have array methods like push/pop
    - contains all the arguments passed to the function
    - not available inside of arrow functions
        ```js
        function sumAll(){
                let total = 0;
                for (let i = 0; i < arguments.length; i++) {
                        total += arguments[i];
                }
                return total;
        }
        sumAll(8, 4, 3, 2);     //17
        sumAll(2,3);    //5
        ```
- rest params: collects all remaining arguments into an actual array
```js
        function sumAll(...nums){
                let total = 0;
                for (let n of nums) total += n;
                return total;
        }
        sumAll(8, 4, 3, 2);     //17
        sumAll(2,3);    //5

        function raceResults (gold, silver, ...everyoneElse){
                console.log(`Gold medal goes to ${gold}`);
                console.log(`Silver medal goes to ${silver}`);
                console.log(`Consolation prize goes to ${everyoneElse}`);
        }
```
- destructuring: a short, clean syntax to unpack:      
    - values from arrays
    - properties from objects into distinct variables
```js
        // Destructuring Arrays
        const raceResults = ['a', 'b', 'c'];
        const [gold, silver, bronze] = raceResults;
        gold;           //"a"
        silver;         //"b"
        bronze;         //"c"
        const [fastest, ...everyoneElse] = raceResults;
        fastest;        //"a"
        everyoneelse;   //["b", "c"]

        // Destructuring objects
        const runner = {
                first: "a",
                last: "b",
                country: "c",
                title: "d"
        }
        const {first, last, country} = runner;          //<--- the order doesn't matter
        first;          // "a"
        last;           //"b"
        country:        //"c"
        const{ first: firstPlace, last, country} = runner;      //<--- to rename a variable
        const{ first, last, country = 'N/A'} = runner;      //<--- to give a default value in case the property does not exist

        // Destructuring Param
        const fullName = ({first,last}) => {
                return  `${first} ${last}`
        }
        const runner = {
                first: "a",
                last: "b",
                country: "c"
        }
        fullName(runner);       // "a b"
```

# Async JavaScript - The Call Stack

- call stack = the mechanism the JS interpreter uses to keep track of its place in a script that calls multiple functions
    - how JS 'knows' what function is currently being run and what functions are called from within that function, etc.
- stack = last in, first out (LIFO) data structure
- how a call stack works:
    - when a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function
    - any functions that are called by that function are added to the call stack further up, and run where their calls are reached
    - when the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing
```js
        //example
        const multiply = (x, y) => x * y;
        const square = x => multiply(x, x);
        const isRightTriangle = (a, b, c) => (
            square(a) + square(b) === square(c)
        )
        isRightTriangle(3,4,5);
```
- the most common tool used is the debug option from Chrome
    - we go to 'Sources
    - we can select a breakpoint anywhere in the code and refresh the page
    - the code stops at a selected breakpoint and we can click 'Step into next func call' or 'Step out of current func call'


# WebAPI & Single Threaded

- JS is single threaded: at any given point in time, that single JS thread is running at most one line of JS code.
- there is a workaround: `setTimeout` ( the browser does the work: Call Stack -> webAPIs -> Callback Queue -> Call Stack)
```js
        console.log('I print first');
        setTimeout(() => {
                console.log('I print after 3 seconds');
        }, 3000);
        console.log('I print second');
```
- browsers come with Web APIs that are able to handle certain tasks in the background (like making requests or setTimeout)
- the JS call stack recognizes these Web API functions and passes them off to the browser to take care of
- once the browser finishes those tasks, they return and are pushed onto the stack as a callback

# Callback Hell =======================

```js
//Callback example
setTimeout(() => {
        document.body.style.backgroundColor = 'red';
        setTimeout(() => {
                document.body.style.backgroundColor = 'orange';
                setTimeout(() => {
                        document.body.style.backgroundColor = 'yellow';
                        setTimeout(() => {
                                document.body.style.backgroundColor = 'green';
                                setTimeout(() => {
                                        document.body.style.backgroundColor = 'blue';
                                }, 1000)
                        }, 1000)
                }, 1000)
        }, 1000)
}, 1000)

//transform into more generic function
const delayedColorChange = (newColor, delay, doNext) => {
        setTimeout(() => {
                document.body.style.backgroundColor = newColor;
                doNext && doNext();             // to check if a new doNext function is called
        }, delay)
}

delayedColorChange('red', 1000, () =>{
        delayedColorChange('orange', 1000, () =>{
                delayedColorChange('yellow', 1000, () =>{
                        delayedColorChange('green', 1000, () =>{
                                delayedColorChange('blue', 1000);
                        });
                });
        });
});

//common use example
searchMoviesAPI('amadeus', () => {
        saveToMyDB(movies, () => {
                //if it works, run this:
        }, () => {
                //if it doesn't work, run this:
        })
}, () => {
        //if API is down, or request failed
})
```

# Promises

- a Promise is an object representing the evantual completion or failure of an asynchronous operation
- ie: `const response = fakeRequestPromise('hikingtrails.com.api/nearme')`
    - response is a Promise        
    - at first it is pending
    - then it gets 'resolved' or 'rejected'
    - we can run code when the Promise is resolved or rejected
- a Promise is a returned object to which you attach callbacks, instead of passing callbacks into a function
- if the promise is resolved we use : `.then`
- if the promise is rejected we use: `.catch`
```js
        const request = fakeRequestPromise('blabla.com/api/coffee');
        request
                .then(() => {
                        console.log("It worked")
                })
                .catch(() => {
                        console.log("Error")
                })
```
- we use return to return promises from within a callback; that allows us to chain things on
```js
        fakeRequestPromise('yelp.com/api/coffee/page1')
        .then((data) => {
            console.log("IT WORKED!!!!!! (page1)")
            console.log(data)
            return fakeRequestPromise('yelp.com/api/coffee/page2')
        })
        .then((data) => {
            console.log("IT WORKED!!!!!! (page2)")
            console.log(data)
            return fakeRequestPromise('yelp.com/api/coffee/page3')
        })
        .then((data) => {
            console.log("IT WORKED!!!!!! (page3)")
            console.log(data)
        })
        .catch((err) => {                                       // we can use a single .catch
            console.log("OH NO, A REQUEST FAILED!!!")
            console.log(err)
        })
```
- promises are resolved and rejected with values


# Creating a Promise

```js
new Promise((resolve, reject) => {      //will be pending until resolve or reject functions are called inside the promise
        resolve();
})

//example
const fakeRequest = (url) => {
        return new Promise((resolve, reject) => {
                const rand = Math.random();
                setTimeout(() => {
                        if (rand < 0.7) {
                                resolve('Your fake data here');
                        }
                        reject('Request Error');
                }, 1000)
        })
}

fakeRequest('/dogs/1')
        .then(() => {
                console.log('Done with request')
                console.log('data is:', data)
        })
        .catch((err) => {
                console.log('Oh no',err)
        })

//Deyaled Color example
const delayedColorChange = (color, delay) => {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                        document.body.style.backgroundColor = color;
                        resolve();
                }, delay)
                
        })
}

delayedColorChange('red',1000)
        .then(() => {
                return delayedColorChange('orange', 1000)
        })
        .then(() => delayedColorChange('yellow', 1000))
        .then(() => delayedColorChange('green', 1000))
        .then(() => delayedColorChange('blue', 1000))
        .then(() => delayedColorChange('indigo', 1000))
        .then(() => delayedColorChange('violet', 1000))
```

# Async Keyword

- async functions: a newer and cleaner syntax for working with async code; syntax 'makeup' for promises
    - 2 pieces: `async` and `Await`
- the async keyword:    
    - async functions always return a promise
    - if the function returns a value, the promise will be resolved with that value
    - if the function throws an exception, the promise will be rejected
```js
        async function hello() {
                                        // returns a promise even if I didn't specify one
        }

//example
const sing = async () => {
                                // we can use also arrow functions
} 
sing()
        .then((data) => {
           throw new Error('Uh oh')           // if we throw an error or something goes wrong, the promise will be rejected
           // or 
           // throw 'Oh no, problem'
           console.log('primise resolved with', data)
        })
        .catch(err => {
                console.log('Oh no, promise rejected')
                console.log(err)
        })
        
//example
const login = async (username, password) => {
        if(!username || !password) throw 'Missing Credentials'
        if(password === 'corgifeetarecute') return 'Welcome!'
        throw 'Invalid Password'
}

login('ffds')
        .then(msg => {
                console.log('logged in')
                console.log(msg)
        })
        .catch(err => {
                console.log('error')
                console.log(err)
        })
```

# Await Keyword

- we can only use te await keyword inside of functions declared with async
- await will pause the execution of the function, waiting for a promise to be resolved
```js
async function rainbow() {
        await delayedColorChange('red', 1000)
        await delayedColorChange('orange', 1000)   //this will run only after the one above is finished, after its promise is resolved
        await delayedColorChange('yellow', 1000)
        await delayedColorChange('green', 1000)
        return "all done"
}

rainbow().then(() => console.log('End of rainbow'))

//or

async function printRainbow() {
        await rainbow();
        console.log('End of rainbow')
}

printRainbow();

//example
async function makeTwoRequests() {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
}
```

# Handling Errors in Async Functions ========

```js
async function makeTwoRequests() {
        let data1 = await fakeRequest('/page1');   // if the promise is rejected, we get an error and the code afterwords will not run
        console.log(data1);                        // it stops the execution of the function
}
```
-  we can use try and catch, so the execution is not stopped
```js
async function makeTwoRequests() {
        try {
                let data1 = await fakeRequest('/page1'); 
                console.log(data1);
                let data2 = await fakeRequest('/page2'); 
                console.log(data2);  
        } catch(e) {
                consle.log('Caught an error')
                console.log('Error is:', e)
        }
                             
}
```

# AJAX - Intro

- AJAX = Asynchronous JavaScript and XML
- we will learn how to make requests using JS.
- API = Application Programming Interface; is a computer interface which defines interactions between multiple software intermediaries
- Web API = interface that occures over http; we make requests to particular URLs that are usually called end points
- XML = extensible markup language; it's not that used anymore


# JSON

- JSON = Java Script Object Notation; it's a lightweight data-interchange format made for sending data, for code to consume (AJAX -> AJAJ)   
- standard: json.org/json-en.html
- to check if it's valid json: jsonformatter.curiousconcept.com
- it is easy for humans to read and write;
- it is easy for machines to pane and generate
- we have key-value pairs
- every key has to be a doublequoted string
- in order to use a JSON, we need to turn it into a valid JS object, instead of just a string of JSON.
- method: `JSON.parse(text[, reviver])` = parse the string text as JSON
```js
        // from https://api.cryptonator.com/api/ticker/btc-usd
        const data = `{"ticker":{"base":"BTC","target":"USD","price":"47895.59023663","volume":"174269.86031954","change":"1843.95807807"},"timestamp":1614073383,"success":true,"error":""}`

        const parsedData = JSON.parse(data)     //will get an object
        parsedData.ticker.price                 // "47895.59023663"             
```
- we can also go the other way; it we want to transform a JS object into JSON:
- method: `JSON.stringify(value[, replacer[, space]])`
```js
        const dog = {breed: 'lab', color: 'black', isAlive: true, owner: undefined}
        JSON.stringify(dog)     //"{"breed":"lab","color":"black","isAlive":true}"
        // by default, all instances of 'undefined' are replaced with 'null'; 
        // the replacer option allows for specifying other behavior
```

# Using Postman

- postman.com: debugging tool; a common way to play and test APIs
- APIs used:    
    - https://www.cryptonator.com/api
    - tvmaze.com/api#full-schedule
    - openweathermap.org/current
    - icanhazdadjoke.com/api
- postman usage: we send a GET request for 
    - https://api.cryptonator.com/api/full/btc-usd
    - http://api.tvmaze.com/search/shows?q=friends
- body: the content of your response
- http response status codes: numerit codes that are standardized; quick way to indicate from the server to us that things are ok or not 
    - these status codes can be viewd also in chrome (Network tab)
- headers: are a bunch of key-value pairs (metadata for the response/request)
- we use query strings: i.e: ?q=friends in http://api.tvmaze.com/search/shows?q=friends
- in postman you can change these query strings manualy or by using Params
- some APIs accepts or requires headers: i.e icanhazdadjoke.com/api


# Making XHR's

- XMLHttpRequest  - the original way of sending requests via JS
    - does not support promises
    - Clunky syntax
```js
        const myReq = new XMLHttpRequest();     //we get a XMLHttpRequest
        myReq.onload = function() {
                const data = JSON.parse(this.responseText);
                console.log(data);
        };
        myReq.onerror = function(err) {
                console.log('Error', err);
        };
        myReq.open('get', 'https://icanhazdadjoke.com/', true);
        myReq.setRequestHeader('Accept', ' application/json');
        myReq.send();
```

# The Fetch API

- a newer way of making http requests using JS
- supports promises
```js
        fetch('https://api.cryptonator.com/api/ticker/btc-usd')   //we get a Promise
                .then(res => {
                        console.log('response, waiting to parse...', res)
                        return res.json()                       //res.json() is another promise
                })
                .then(data => {
                        console.log('Data parsed", data)
                        console.log(data.ticker.price)
                })
                .catch (err => {
                        console.log('error',err)
                })
```
- as soon as the fetch gets the first bit of the headers, fetch is gonna resolve the promise
- this is why we use a method called `.json()`
```js
        const fetchBitcoinPrice = async() => {
                const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd')
                const data = await res.json();
                console.log(data.ticker.price);
        }

        //use try and catch
        const fetchBitcoinPrice = async () => {
                try {
                        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd')
                        const data = await res.json();
                        console.log(data.ticker.price);
                }
                catch(e){
                        console.log('Something went wrong',e)
                }
                
        }
```

# Axios

- external library for making http requests
- from https://github.com/axios/axios we need to copy the following line: `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
- and include it in our html fine, in the body (before our js script), or in the head
- `.get` method:
```js
        axios.get('https://api.cryptonator.com/api/ticker/btc-usd');    //it's a promise
            .then( res => {
                console.log(res.data.ticker.price)
            })
            .catch(err => {
                console.log('error!!!!',err)
            })

        //same function as before; to compare
        const fetchBitcoinPrice = async () => {
            try {
                const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
                console.log(`Current Price is $${res.data.ticker.price}`)
            }
            catch(e){
                console.log('Something went wrong',e)
            }

        }
```
- setting headers:
```js
        const getDadJoke = async () => {
            const config = {headers: {Accept: 'application/json'}}
            const res = await axios.get('https://icanhazdadjoke.com/', config)  //we need to pass a second argument 
            console.log(res.data.joke)                  
        }
```
- adding params (query string object):
    - instead of this: axios.get(`http://api.tvmaze.com/search/shows?q=${userInput}`)
    - we can use: 
        - axios.get(`http://api.tvmaze.com/search/shows`, {params: {q: userInput, username: 'lari'}})
        - or
        ```js
         const config = {params: {q: userInput}}           //usefull when we have multiple queries
         axios.get(`http://api.tvmaze.com/search/shows`, config)
        ```

# Prototypes

- Prototypes = the mechanism by which JavaScript objects inherit features from one another.
- JS is often described as a prototype-based language - to provide inheritance, objects can have a prototype object, which acts as a template object that it inherits methods and properties from
- `Array.prototype` - is the actual prototype object where we add the methods to, or the properties.( is the template object)
- `_proto_` - is a property that references the objects prototype (it contains a bunch of objects).
```js
        let arr = [1,2,3]
        arr.push(4)     //will have a _proto_ with all the array methods

        Array.prototype         // everything on the Array prototype
        String.prototype
```
- we can add our own method: 
```js
        String.prototype.grumpus = () => alert("Go away")
        //every time we make a string until I refresh we will have access to this new string method called grumpus
        const cat = "Blue"
        cat.grumpus()   //will trigger the alert
```
- we can add also properties:
```js
        String.prototype.yell = function() {
                console.log(this.toUpperCase());     
        }

        "hello".yell()           // refers to >String {"hello"}
```
- you can replace an existing method:
```js
        Array.prototype.pop = function() {
                return "Sorry I want that element, I will never pop it off!"
        }

        [3,4,5].pop()           // "Sorry I want that element, I will never pop it off!"
```

# Object Oriented programming

- central idea: organizing our code, designing and structuring our application by breaking things up into distinct patterns of objects


# Factory Functions

- A factory function is any function which is not a class or constructor that returns a (presumably new) object. 
- In JS, any function can return an object. When it does so without the new keyword, it’s a factory function.
- they offer the ability to easily produce object instances without diving into the complexities of classes and the new keyword.
- function to convert rgb colors to hex:
```js
function hex(r,g,b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1);
}

function rgb(r,g,b){
        return `rgb(${r}, ${g}, ${b})`;
}
```
- a factory function    
    - would make me an object that would automatically had a hex method and an rgb method;
    - will store the r, g and b values as values or properties on the object
```js
function makeColor(r,g,b) {
        const color = {};       //makes as an empty object
        color.r = r;            //adds some properties
        color.g = g;
        color.b = b;
        color.rgb = function(){         //then we add some methods
             const {r,g,b} = this;              //to extract or desctruct rgb from 'this'; 'this' refers to 'color' object
             return `rgb(${r}, ${g}, ${b})`;
        }
        
        color.hex = function() {
                const {r,g,b} = this;
                return '#' + ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1);
        }

        return color;                   //then we return that object
}

const firstColor = makeColor(35, 255, 150);
firstColor.hex()
purple.rgb()
```
- the disadvantage of factory fnctions is that the inside methods are defined on every single array in our case
```js
        firstColor.hex === black.hex   //false

        "hi".slice === "bye".slice      //true; these methods are not called inside an object, but inside __proto__
```
- factory functions return a new object every time it is called and on that object we add in individual methods that are unique each time

# Constructor Functions

- the new operator lets developers create an instance of a user-defined object type or 
        of one of the built-in object types that has a constructor function.
- The new keyword does the following things:
    - Creates a blank, plain JavaScript object.
    - Adds a property to the new object (`__proto__`) that links to the constructor function's prototype object
        - Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using new).
    - Binds the newly created object instance as the this context
        - i.e. all references to this in the constructor function now refer to the object created in the first step).
    - Returns this if the function doesn't return an object.
- example:
```js
        function Color(r,g,b) {         // it's a convention to name constructor functions with capital letter
                this.r = r;             // this reffers to that new object, otherwise to the Window in this example
                this.g = g;
                this.b = b;
        }

        Color.prototype.rgb = function() {             //we don;t want to use arrow functions, because 'this' behaves differently
                const {r, g, b} = this;
                return `rgb(${r}, ${g}, ${b})`;
        };

        Color.prototype.hex = function(){
                const {r,g,b} = this;
                return '#' + ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1);
        }

        Color.prototype.rgba = function(a=1.0){
                const {r,g,b} = this;
                return `rgba(${r}, ${g}, ${b}, ${a})`
        }

        const color1 = new Color(255, 40, 100); //this object will have the rgb method inside __proto__
        const color2 = new Color(0, 0, 0);
        document.body.style.backgroundColor = color1.rgb()
        document.body.style.backgroundColor = color1.rgba(0.4)
```

# JS Classes

- class - keyword
- we capitalize the names when using classes or constructor functions
- constructor   = is a class or function that specifies the type of the object instance
                = in our example is a function that will execute immediately whenever a new color is created
```js
class Color {
        constrctor(r,g,b, name){      //this function will execute immediately
                this.r =r;      // will be added as properties in the new object that we get returned
                this.g = g;
                this.b = b;
                this.name = name;
        }
        greet(){
                return `Hello from ${this.name}!`;
        }
        innerRGB(){
                const {r,g,b} = this;   //destructure r, g and b from this
                return `${r}, ${g}, ${b})`;
        }
        rgb(){
                return `rgb(${this.innerRGB()})`       //this reffers to innerRGB
        }
        rgba(a=1.0){  
                return `rgba(${this.innerRGB()}, ${a})`
        }
        hex(){
                const {r,g,b} = this;
                return (
                        '#' + ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1)
                );
        }
        
}
const c1 = new Color(255, 67, 89, 'tomato');
c1.greet()      //"Hello from tomato!"
```

# Extends and Super Keywords

- a way to share functionality between classes.
```js
        class Cat {
                constrctor(name, age){
                        this.name = name;
                        this.age = age;
                }
                eat() {
                        return `${this.name} is eating!`;
                }
                meow() {
                        retun 'MEOWWW!';
                }
        }
        class Dog {
                constrctor(name, age){
                        this.name = name;
                        this.age = age;
                }
                eat() {
                        return `${this.name} is eating!`;
                }
                bark() {
                        return 'WOOOF!';
                }
        }
        const Susie = new Cat('Susie',4)
        const Sam = new Dog('Sam',7)
```
- we see that there is a lot of duplicated functionality
- the scope is to move this duplicated code into a separate stand-alone class that both of these functions could extend
```js
        class Pet {
                constrctor(name, age){
                        this.name = name;
                        this.age = age;
                }
                eat() {
                        return `${this.name} is eating!`;
                }
        }
        class Cat extends Pet {
                meow() {
                        retun 'MEOWWW!';
                }
        }
        class Dog extends Pet {
                bark() {
                        return 'WOOOF!';
                }
        }
        const susie = new Cat('Susie',4)
        const sam = new Dog('Sam',7)

        sam.eat()       // "sam is eating!"
```
- when we use 'extends', the class is gonna use the contructor of 'Pet' if it doesn't have one on 'Dog' or 'Cat' classes
- if we want to have some additional information for some classes, like 'Cat'
```js
        class Pet {
                constrctor(name, age){
                        this.name = name;
                        this.age = age;
                }
                eat() {
                        return `${this.name} is eating!`;
                }
        }
        class Cat extends Pet {
                constructor(name, age, livesLeft = 9){        // if we don't want to duplicate that, we can use the 'super' keyword
                        this.name = name;
                        this.age = age;
                        this.livesLeft = livesLeft
                }
                meow() {
                        retun 'MEOWWW!';
                }
        }
        class Dog extends Pet {
                bark() {
                        return 'WOOOF!';
                }
        }
```
- the same class with the `super` keyword:
- super is going to reference the class that we are extending from:
```js
        class Pet {
                constrctor(name, age){
                        this.name = name;
                        this.age = age;
                }
                eat() {
                        return `${this.name} is eating!`;
                }
        }
        class Cat extends Pet {
                constructor(name, age, livesLeft = 9){   
                        super(name, age)
                        this.livesLeft = livesLeft
                }
                meow() {
                        retun 'MEOWWW!';
                }
        }
        class Dog extends Pet {
                bark() {
                        return 'WOOOF!';
                }
        }
```