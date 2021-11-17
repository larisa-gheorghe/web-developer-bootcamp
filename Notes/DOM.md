# Introduction

- DOM = Document Object Model
- DOM is the interface between Javascript and HTML+CSS
- the browser turns every HTML tag into a Javascript object that we can manipulate
- everything is stored inside of the document object
- to print out the entire document object:      `console.dir(document)`
- the process: `SELECT` an element and then `MANIPULATE`
- out entire DOM (all the objects, all the representations of elements live inside this `document` object); 
- It's the top level object on the root node
    - document.URL;
    - document.head;
    - document.body;
    - document.links;
- the document object is our entry point into the world of DOM.
- it contains representations of all the content on a page, plus tons of useful methods and properties.
- `console.dir(document)`       // we can see the document object


# Methods for selecting elements

- the document comes with a bunch of methods for selecting elements:
    - `document.getElementById()`
        - takes a string argument and returns the one element with a matching ID
        - i.e: `let tag = document.getElementById("highlight"); `

    - `document.getElementsByTagName()`
        - returns a list of all elements of a given tag name, like `<li>` or `<h1>`
        - this will return an HTMLCollection; inside a HTMLCollection there is an Element;
        - Element: is the most general base class from which all element objects in a Document inherit
        - i.e: `let tag = document.getElementByTagName("li"); `

    - `document.getElementsByClassName()`
        - takes a string argument and returns a list of elements that have a matching class
        - i.e: `let tag = document.getElementByClassName("bolded");`

    - `document.querySelector()`
        - returns the first element that matches a given CSS-style selector
        - i.e: 
        ```
                let tag = document.querySelector("#highlight");   <--- we use the CSS format for id
                let tag = document.querySelector(".bolded");      <--- we use the CSS format for class
                let tag = document.querySelector("li a.special");
                let tag = document.querySelector("a[title="Java"]);
        ```
    - `document.querySelectorAll()`
        - returns a collection of elements that matches a given CSS-style selector
- the differences between NodeList and HTMLCollection:
    - Both interfaces are collections of DOM nodes
    - They differ in the methods they provide and in the type of nodes they can contain. 
    - While a NodeList can contain any node type, an HTMLCollection is supposed to only contain Element nodes.
    - An HTMLCollection provides the same methods as a NodeList and additionally a method called namedItem.
    - Collections are always used when access has to be provided to multiple nodes, e.g. most selector methods (such as `getElementsByTagName`) return multiple nodes or getting a reference to all children (`element.childNodes`).


# Properties & Methods
- the most import properties and methods: `classList, getAttribute(), setAttribute(), appendChild(), append(), prepend(), removeChild(), remove(), createElement, innerText, textContent, innerHTML, value, parentElement, children, nextSibling, previousSibling, style`
- the style property is one way to manipulate an element's style
```js
        let tag = document.getElementById("highlight");
        tag.style.color = "blue";
        tag.style.border = "10px solid red";
        tag.style.fontsize = "70px";
```
- in js the properties are camel cased, unlike css
- the style object does not contain styles from our style sheest. It will contain any inline style that we have. 
- But we can use it to change the styles
- It is recommended for styles to be defined in a separate file or files (separation of concerns)
- the style property allows for quick styling, for example for testing purposes.
- alternative: rather than directly manipulation style with JS, we can define a CSS class and then toggle it on or off with JS
```css
        /*define a class in CSS*/
        .some-class {
            color: blue;
            border: 10px solid red;
        }
```
```js
        //add the new class to the selected element
        let tag = document.getElementById("highlight");
        tag.classList.add("some-class");

        //rainbow text example
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        let letters = document.querySelectorAll('span');
                for (let i = 0; i < colors.length; i++){
                        letters[i].style.color = colors[i];
                }               
```
- you can use the following to get all styles: `window.getComputedStyle(h1)`  <--- we can a CSS StyleDeclaration with all the styles for that h1; you get strings
- `classList` = a read-only list that contains the classes for a given element. It is not an array.
```js
        tag.classList.add("some-class");
        tag.classList.remove("some-class");
        tag.classList.contains("some-class"); // true or false
        tag.classList.toggle("some-class");
```
- `innerText` = property of the HTMLElement interface that represents the "rendered" text content of a node and its descendants.
    - innerText is aware of the rendered appearance of text, while textContent is not.
```js
        const renderedText = htmlElement.innerText
        htmlElement.innerText = string
```
- `textContent` = returns a string of all the text contained in a given element
    - treats whatever you give it as just text
```js
        <p>This is an <strong>awesome</strong> paragraph</p>
        let tag = document.querySelector("p");
        tag.textContent     //"This is an awesome paragraph    <-- //retrieve the textContent
        tag.textContent = "blah blah";      <-- //alter the textContent
```
- `innerHTML` = similar to textContent, except it returns a string of all the HTML contained in a given element
    - treats the text like HTML
```js
        <p>This is an <strong>awesome</strong> paragraph</p>
        tag.innerHTML       //"This is an <strong>awesome</strong> paragraph"
```
- `parentElement` = read-only property returns the DOM node's parent Element, or null if the node either has no parent, or its parent isn't a DOM Element.
- `children` = will give an HTMLCollection with all children
- `nextSibling`/ `previousSibling` = will give us the coresponding node
- `nextElementSibling` / `previousElementSibling` = will give us the next/previous element
- `createElement` = creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized
```js
        let element = document.createElement(tagName[, options]);
```
- `appendChild` = adds a node to the end of the list of children of a specified parent node. 
    - If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position
    - `element.appendChild(aChild)`
```js
        let container = document.querySelector('#container');
        for (let i = 0; i < 100; i++){
            let newButton = document.createElement('button');
            newButton.innerText = 'Hey!';
            container.appendChild(newButton);
        }
```
- `append` = inserts a set of Node objects or DOMString objects after the last child of the ParentNode.
    - allows you to also append DOMString objects, whereas Node.appendChild() only accepts Node objects.
    - has no return value, whereas Node.appendChild() returns the appended Node object.
    - can append several nodes and strings, whereas Node.appendChild() can only append one node.
    - syntax: ParentNode.append(...nodesOrDOMStrings) // returns undefined
- `prepend` =  inserts a set of Node objects or DOMString objects before the first child of the ParentNode.
        `ParentNode.prepend(...nodesOrDOMStrings);`
- `insertAdjacentElement()` = inserts a given element node at a given position relative to the element it is invoked upon.
    - syntax: `targetElement.insertAdjacentElement(position, element);`
    - One of the following strings:
        - `beforebegin`: Before the targetElement itself.
        - `afterbegin`: Just inside the targetElement, before its first child.
        - `beforeend`: Just inside the targetElement, after its last child.
        - `afterend`: After the targetElement itself.
- `after` = inserts an element after aother element
        `h1.after(h3)`    //h3 will appear after h1
- `before` = inserts an element before aother element
- `removeChild` = removes a child node from the DOM and returns the removed node (old method)
```js
        let oldChild = node.removeChild(child);

        const firstLi = document.querySelector('li')
        const ul = firstLi.parentElement
        ul.removeChild(firstLi)

        //or we can do it in one line
        const firstLi = document.querySelector('li')
        firstLi.parentElement.removeChild(firstLi)
```
- remove = removes the object from the tree it belongs to
```js
        node.remove();

        const img = document.querySelector('img')
        img.remove()
```

# Manipulating Attributes

- use `getAttribute()` and `setAttribute()` to read and write attributes like `src`, `title` or `href`
```html
        <a href="www.google.com">I am a link</a>
        <img src="logo.png">
```
```js
        let link = document.querySelector("a");
        link.getAttribute("href");      //"www.google.com"
        link.setAttribute("href","www.dogs.com");       //<a href="www.dogs.com">I am a link</a>

        let img = document.querySelector("img");
        img.setAttribute("src","corgi.png");            //<img src="corgi.png">
```

# DOM Events

- responding to user inputs and actions
- examples of events: click on a button, hovering, dragging and dropping, scrolls, form submission, key presses, focus/blur, mouse wheel, double click, copying, pasting, audio start, screen resize, printing


# Methods for working with Events

- in our html file: not recommended: `onclick`
        `<button onclick="alert('you clicked me'); alert('you clicked me again')">Click Me!</button>`
- in our js file - is a better method: `onclick`
    ```js
    const newButton = document.querySelector('#id');
    console.dir(newButton)  // if we check we can see many properties set to null, including onclick
    newButton.onclick = function(){
            console.log('You clicked me')
            console.log('I hope it works')
    }                     
    //other example
    function scream() {
            console.log("AAAAA");
    }
    newButton.onmouseenter = scream;        // the function is passed to onmouseenter; 
                                            // we always need a function, because the code is not executed right away                     
    //other example using arrow function
    document.querySelector('h1').onclick = () => alert('You clicked me!');
    ```
   - using this method we cannot have two different callback functions for the same event
- `addEventListener` = specify the event type and a callback to run
    - syntax: `element.addEventListener(type, functionToCall);`
        ```js
        const button = document.querySelector('h1');
        button.addEventListener('click', () => {
                alert('You clicked me!');
        })
        ```
    - list of events: https://developer.mozilla.org/en-US/docs/Web/Events 
    - using this method we can have as many callback functions for the same event as we want
    - has different options:
        ```js
        // will run once, first time it is clicked, then the event will be removed
                button.addEventListener('click', functionName, {once: true}) 
        ```

# Events & The Keyword This

```js
const buttons = document.querySelectorAll('button');

for (let button of buttons) {
        button.addEventListener('click', colorize)
}

function colorize() {
        this.style.backgroundColor = makeRandColor();
        this.style.color = makeRandColor();
}
```

# Event Object & Keyboard Events

- the event Object is automatically passed in to our callback ( in the below example a function)
```js
        document.querySelector('button').addEventListener('click, function(evt){
                console.log(evt);
        })
```
- keyboard events:
```js
        const input = document.querySelector('input');
        input.addEventListener('keydown',function(e){
                console.log(e);                 // We get a keyboard event
                console.log(e.key);     // a
                console.log(e.code);    // KeyA (corresponds to an actual location on the keyboard)
        })
        input.addEventListener('keyup',function(){
                console.log('Keyup')
        })

        // example
        window.addEventListener('keydown', function(e){
                console.log(e.code);    // ArrowLeft ArrowRight ArrowUp
                switch(e.code){
                        case 'ArrowUp':
                                console.log('UP');
                                break;
                        case 'ArrowDown':
                                console.log('Down');
                                break;
                        case 'ArrowLeft':
                                console.log('Left');
                                break;
                        case 'ArrowRight':
                                console.log('Right');
                                break;
                        default:
                                console.log('Ignored');
                }
        })
```

# Form Events

- preventDefault = prevents the default behavior that would happen as a result of an event.
```html
        <!-- html -->
        <form action="/dogs" id="tweetForm">
                <input type="text" name="username" placeholder="username">
                <input type="text" name="tweet" placeholder="tweet">
                <button>Post Tweet</button>
        </form>
        <h2>Tweets:</h2>
        <ul id="tweets">
        </ul>
```
```js
        //js
        const tweetsContainer = document.querySelector('#tweets');
        const tweetForm = document.querySelector('#tweetForm');
        tweetForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // const usernameInput = document.querySelectorAll('input')[0];
            // const tweetInput = document.querySelectorAll('input')[1];
            //another option is to use 'elements' from console.dir('tweetForm')
            // if we give in html a name for every input, that name will appear as a property name inside elements

            const usernameInput = tweetForm.elements.username;
            const tweetInput = tweetForm.elements.tweet;
            addTweet(usernameInput.value, tweetInput.value)
            usernameInput.value = '';
            tweetInput.value = '';
        });

        const addTweet = (username, tweet) => {
            const newTweet = document.createElement('li');
            const bTag = document.createElement('b');
            bTag.append(username)
            newTweet.append(bTag);
            newTweet.append(`- ${tweet}`)
            tweetsContainer.append(newTweet);
        }       
```

# Input & Change Events

- change = the event is fired for `<input>`, `<select>`, and `<textarea>` elements when an alteration to the element's value is committed by the user. 
    - the change event is not necessarily fired for each alteration to an element's value.
    - the change event fires at a different moment:
        - when the element is :checked for `<input type="radio">` and `<input type="checkbox">;`
        - when the user commits the change explicitly
            - by selecting a value from a `<select>`s dropdown with a mouse click 
            - by selecting a date from a date picker for `<input type="date">`
            - by selecting a file in the file picker for `<input type="file">`
        - when the element loses focus after its value was changed, but not committed
            - after editing the value of `<textarea>` or `<input type="text">`).
```js
        const input = document.querySelector('input');
        input.addEventListener('change',function(e){
                console.log('Bla');
        })
```
- input = the event fires when the value of an `<input>`, `<select>`, or `<textarea>` element has been changed. 
```js
        input.addEventListener('input',function(e){
                console.log('Bla Bla');
        })

        //live preview on h1 of what you are typing
        const input = document.querySelector('input');
        const h1 = document.querySelector('h1');
        input.addEventListener('input',function(e){
                h1.innerText = input.value;
        })

        //input event practice
        const input = document.querySelector('input');
        const h1 = document.querySelector('h1');

        input.addEventListener('input', function(e){
            if (input.value !== ''){
            h1.innerText = `Welcome, ${input.value}`;
            } else {
                h1.innerText = 'Enter Your Username';
            }
        });
```

# Event Bubbling ========================

- bubbling principle: when an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.
- to stop bubbling we use the method:  `event.stopPropagation()`


# Event Delegation

- bubbling allows us to take advantage of event delegation
- if you want some code to run when you select any one of a large number of child elements, you can set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on every child individually.
- A good example is a series of list items 
    - if you want each one to pop up a message when selected, you can set the click event listener on the parent `<ul>`
    - events will bubble from the list items to the `<ul>`.
- we use `event.target` to see where the event actually happened
```js
        tweetsContainer.addEventListener('click', function(e){
                e.target.nodeName === 'LI' && e.target.remove();        //short version of an if statement
        })
```