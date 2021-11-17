# Introduction

- documentation:
    - https://jquery.com/
    - https://youmightnotneedjquery.com/
- jQuery is a DOM manipulation library
- is a fast, small, and feature-rich JavaScript library. 
- It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. 
- combination of versatility and extensibility
- why use jQuery:   
    - fixes 'broken' DOM API
    - brevity and clarity
    - ease of use
    - cross-browser support
    - Ajax
- why not use jQuery:   
    - the DOM API is no longer 'broken'
    - it doesn't do anything you can't do on your own
    - it's an unnecessary dependency
    - performance


# Adding jQuery

- download jQuery and link to it locally:   `<script type="text/javascript" src="jquery.js"></script>`
- OR link to a CDN (hosted copy):   `<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.js"></script>`


# Selecting

- selecting elements with $():
    - selecting with jQuery is very similar to querySelectorAll, in that we provide a CSS style selector and jQuery will return all matching elements
    - example:  
```js
                //to select all img tags
                $("img")
                //to select all elements with class 'sale'
                $(".sale")
                //to select element with id 'bonus'
                $("#bonus")
                //to select all a tags inside of li's
                $("li a")
```
- use `.css()` method to style elements(this method is jQuery's interface to styling):
    ```js
                $(selector)
                .css(property, value)
    ```
    - example:  
    ```js
                //select elem with id "special" and give it a border
                $("#special").css("border", "2px solid red");
                //we can also pass in an object with styles
                var styles = {
                    backgroundcolor: "pink",
                    fontWeight: "bold"
                };

                $("#special").css(styles);
    ```