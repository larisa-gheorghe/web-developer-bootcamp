# Introduction

- Cascading Style Sheets - a language that defines the STYLE of HTML
- resources:
    - https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048
    - https://www.w3.org/TR/selectors-3/#specificity
    - CSS Tools: Reset CSS: https://meyerweb.com/eric/tools/css/reset/

## General Rule

```css
selector {
    property: value;
    anotherProperty: value;
}
```

# Style Tag

- we an include css by using `<style>` tag
```html
<html>
<head>
    <title></title>
    <style type="">
        selector {
            property: value;
        }
    </style>
</head>
```
- BUT we want to separate our HTML and our CSS ==> we want to use a `<link>` tag
```html
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="addingcss.css">
</head>
```

# Colors

- Built In Colors: see all of them on colours.neilorangepeel.com
- Hexadecimal colour system: # + string of 6 hexadecimal numbers (from 0-F)
    - `# _ _ _ _ _ _` :
        - fisrt 2 corespond to how much red is in the color
        - next 2 corespond to how much green is in the color
        - next 2 corespond to how much blue is in the color
    - color picker search: to find out the hexadecimal number for a specific colour
```css
    selector {
    color:#1c6780 ;
    }
```
- RGB colour system: 3 channels: Red, Green, Blue with range 0-255
```css
    selector {
    color: rgb(0,255,0) ;
    }
```
- RGBA colour system:   
    - like RGB, but with an alpha (transparency) channel with ranges from 0.0-1.0
    - The alpha channel specifies how opaque the color is.
    - 0: The element is fully transparent (that is, invisible)
    - 1 (default value)	The element is fully opaque (visually solid).
    - ie:   
        - `rgba(red, green, blue, alpha)`
        - `rgba(255, 153, 255, 0.4)`
        - `background-color: #ff80ff00;`  <--- the last two digits represent the transparency ( values from 00 to FF)
- opacity:  
    - is the degree to which content behind an element is hidden, and is the opposite of transparency
    - the entire element will be impacted
    - ie: `opacity: 0.4;`


# Background

- color:
```css
    selector {
        background: #7839FF;
    }
```
- image:
```css
    selector {
        background-image: url();
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;               /*<--- sets the initial position for each backgorund image */
    }
```

# Borders

- width
- color
- style
-all 3 are required so the border can appear
```css
selector {
    border-color: ;
    border-style: ;
    border-width: ;   
}

/* OR */

selector {
    border: color style width;
}
```

# Selectors

- documentation: https://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048
- Type selector: Selects all elements that have the given node name.
- ID selector: defines an identifier which must be unique in the whole document. 
    - Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
 ```html
    <!-- HTML: -->
    <div>
        <p id="unique_name"> Content </p>
    </div>
```
```css
    /* CSS:  */
    #unique_name {
        color:yellow;
    }
```
- Class selector : selects all elements within a given class
```html
        <!-- HTML:  -->
        <div>
            <p class="name"> Content </p>
            <p class="name"> Content2 </p>
        </div>
```
```css
        /* CSS:   */
        .name {
            color:yellow;
        }
```
- Universal selector: will select everything on a page
```css
                * {
                    color: pink:
                }
```
- Grouping selector: it selects all the matching nodes
    - ie: `div, span {}`    <--- will match both `<span>` and `<div>` elements.
- Descendant selector: it takes two or more tag names/selectors and you change them together
    - ie: `li a {}`   <--- select all anchortags that are descendant of a li
    - ie: `ul li a {}`
- Adjacent selector: let us select elements that come after other elements (siblings, same level)
    - ie: `h4 + ul {}`  <---- all ul that come after h4
- Attribute selector: a way to select elements based of on any attributes
    - ie: `a[href="http://google.com"] {}`      <--- every anchortag with href equals to http://google.com
    - ie: `input[type="text"] {}`
- Direct child combinator: The > combinator selects nodes that are direct children of the first element.
    - ie: `ul >li`         <--- will match all `<li>` elements that are nested directly inside a `<ul>`
- Pseudo classes:       
    - `:active`
    - `:checked`
    - `:first`
    - `:first-child`
    - `:hover`
    - `:not()`
    - `:nth-child()`
    - `:nth-of-type()`
- nth of type selector: it takes a number and then it selects every nth of a specific element
    - ie: `ul:nth-of-type(3n) {}`    <--- select every third of ul of a group
    - ie: `ul:nth-of-type(3) {}`    <--- select only the third ul of a group
- Pseudo elements:      
    - `::after`
    - `::before`
    - `::first-letter`
    - `::first-line`
    - `::selection`

# Inheritance & Specificity

- If we set a property on a parent it can also affect a child element
- *specificity*: we can have multiple styles targeting an element. Which style is more specific win
- how specificity is calculated: https://www.w3.org/TR/selectors-3/#specificity
- calculator: https://specificity.keegan.st
- Concatenating the three numbers a-b-c (in a number system with a large base) gives the specificity:
    - count the number of ID selectors in the selector (= a)
    - count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= b)
    - count the number of type selectors and pseudo-elements in the selector (= c)
    - ignore the universal selector
- inline styles are more specific than ID selectors (!!not recommended)
- the `!important` exception - it means that it will ignore the specificity and win automatically (not recommended to use)
    - ie: 
```css
    a {
            background-color: white !important;
        }
```

# Text & Fonts

- documentation: [CSS Font Stack](https://www.cssfontstack.com/)
- font-family
```css
    selector {
    font-family: "";
    }
```
- font-size
```css
    selector {
    font-size: "";
    }
```
- Another way of setting the font size is with `em` values
    - The size of an em value is dynamic. 
    - When defining the font-size property, an em is equal to the font size of the element on which the em is used. 
    - If you haven't set the font size anywhere on the page, then it is the browser default
```css
    selector {
    font-size: 2.0em;
    }
```
- font-weight
```css
    selector {
    font-weight: bold;     /* <--- some fonts allow the use of numeric value from 100 to 800 (divisible to 100) */
    }
```
- line height
```css
    selector {
    line-height: 1.5;
    }
```
- text-align
```css
    selector {
    text-align: justify;
    }
```
- text-decoration
```css
    selector {
    text-decoration: underline;
    }
```
- Google Fonts: you need to put the link in the html file and use the css rules from the site in the css file.
- text-shadow: you can have multiple shadows(use `,` to separate them)
```css
    selector {
    text-shadow: offset-X offset-Y blur_radius color;
    }
```
- i.e:
```css
    text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
                 0px 8px 13px rgba(0,0,0,0.1),
                 0px 18px 23px rgba(0,0,0,0.4);
```

# The Box Model

- in a document, each element is represented as a rectangular box
- in css each these rectangular boxes is described using the standard box model
- each box has four edges: the margin edge, border edge, padding edge and content edge
```css
p {

    /* Content - Widht and Height of an element (inner content area)*/
        width: 200px;
        height:100px;
        width: 50%;      /* <---50% of the parent element; If I change the window size, the width also changes */


    /* Border and Border-Radius*/
        border: 2px solid blue;
        /*or*/
        border-width: 2px;
        border-style: solid;
        border-color: blue;

        border-sizing: border-box;   /* <--- in case we add a border, the element will still have the width of the element set before */

        border-radius: 30px;
        border-radius: 50%;

    /*Padding= the space between the element and the border */
        padding:10px;               /*<-- all 4 sides */
        padding: 5px 10px;          /*<-- vertical | horizontal */
        padding: 1px 2px 2px;       /*<--- top | horizontal | bottom */
        padding: 5px 1 px 0 2px;    /*<--- top | right | bottom | left */
        /*or*/
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        padding-top: 10px;

    /*Margin */
        margin:10px;               /*<-- all 4 sides */
        margin: 5px 10px;          /*<-- vertical | horizontal */
        margin: 1px 2px 2px;       /*<--- top | horizontal | bottom */
        margin: 5px 1 px 0 2px;    /*<--- top | right | bottom | left */
        /* or */
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
```
- if we want to add images using `<img src="">` , it automatically adds some space after the image. To remove that, we can use float in css files. Then we can add the desired margins
```css
        img {
            margin: 10%;
        }
```

# Display Property ==============

- inline:     
    - width and height are ignored
    - margin and padding push elements away horizontally but not vertically
- block:        
    - block elements break the flow of a document
    - width, height, margin and padding are respected
- inline-block: behaves like an inline element except width, height, margin, and padding are respected
- ie:   
```css
        h1 {
            display: inline;    /*<---will act like an inline element */
        }

        span {
            display: block     /*<--- will act like a block element */
        }
```
- to hide an element you can use: `display: none`    <--- the element is still there, but it doesn't ocupy space


# Units

- relative units:    
    - em     
        - with font size, 1em equals the font-size of the parent
        - with other properties, 1 em is equal to the computed font-size of the element itself
    - rem     
        - root ems
        - relative to the root html element's sont-size. ( easier to work with)
        - if the root font-size is 20px, 1 rem is always 20px, 2rem is always 40px, etc.
    - vh
    - vw
    - %       
        - percentages are always relative to some other value (from the parent or from the element itself)
        - ie: `width: 50%`      <--- half the width of the parent
        - ie: `line-height: 50% `     <--- half the font-size of the element itself

- absolute units:   
    - px
    - pt
    - cm
    - in
    - mm


# Position Property

- the position property sets how an element is positioned in a document
- ie:
```css
selector {
    position: static        /* <--- nothing changes */
}

selector {
    position: relative      /* <--- the element is positioned accorgind to the normal flow of the document 
                                and then offset relative to itself based on the values of top, right, bottom and left */
    top: 100px;
    left: -100px;
}

selector {
    position: absolute      /* <--- the element is removed from the normal flow of the document 
                                and no space is created for the element in the page layout;
                                It is positioned relative to its closest positioned ancestor, if any;
                                otherwise it is placed relative to the initial containing block.
                                Its final position is determined by the values of top, right, bottom and left */
    top: 1px;
    left: 1px;
}

selector {
    position: fixed          /* <--- the element is removed from the normal flow of the document 
                                and no space is created for the element in the page layout;
                                It is positioned relative to the initial containing block established by the viewport,
                                except when one of its ancestors has a transform, perspective or filter property set
                                to something other than 'none', in which case that ancestor behaves as the containing block.
                                Its final position is determined by the values of top, right, bottom and left */
    top: 0px;
    left: 0px;
}
```

# CSS Transitions

- we can specify:   
    - property name
    - duration
    - timing function: 
```css
        selector {
        transition-timing-function: ease-in;    /* <--- ease-out, cubic-bezier(0.7, 0, 0.84, 0) */
        }
```
    - delay
```css
    selector {
        background-color: magenta;
        transition: 1s;
        /* or */
        transition: background-color 3s;
        /* or */
        transition: background-color 1s 1s;     /* <--- 1s wait, 1s change */
        /* or */
        transition: all 1s;
        /* or */
        transition: background-color 1s, border-radius 2s;
    }

    selector:hover {
        background-color: cyan;
    }
```

# Transform property

- Function values:
```css
transform:matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: perspective(17px);
transform: rotate(0.5turn);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg); 
transform: rotateY(10deg); 
transform: rotateZ(10deg); 
transform: translate(12px, 50%)
transform: translate3d(12px, 50%, 3em);
transform: translateX(2em);
transform: translateY(2in);
transform: translateZ(2px);
transform: scale(2, 0.5);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.3);
transform: skew(30deg, 20deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
```
- Multiple function values: `transform: translateX(10px) rotate(10deg) translateY(5px);`
- `transform-origin`: sets the origin for an element's transformations.


# FlexBox

- is a one-dimensional layout method for laying out items in rows or columns
- allows us to distribute space dynamically across elements of an unknown size
- there are two axes sets: main axis (default is left to right) and cross axis (default is top to bottom)
- to start using flexbox, we need to set:
        `display: flex;`
- properties:
```
        flex-direction: row;            <--- controls the alignment of items on the Main Axis
        flex-direction: row-reverse;    <--- main axis will go right to left
        flex-direction: column;
        flex-direction: column-reverse;     <--- will go bottom to top

        justify-content: flex-start;
        justify-content: flex-end;
        justify-content: center;
        justify-content: space-between;     <--- will take all the space and distribute it between the elements, but not outside( between the element and the container)
        justify-content: space-around;      <--- will give each element the same space around
        justify-content: space-evenly;      <--- the space is even between every element and between the elements and the container

        flex-wrap: wrap;                <--- sets whether flex items are forced onto one line or can wrap onto multiple lines
        flex-wrap: wrap-reverse;
        flex-wrap: nowrap;

        align-items: flex-start;        <--- controls the alignment of items on the Cross Axis
        align-items: flex-end;
        align-items: center;
        align-items: baseline;          <--- the elements inside will follow the same baseline

        align-content: space-between;   <--- sets the distribution of space between and around content items along a flexbox's cross-axis
        align-content: space-around;
        align-content: flex-start;
        align-content: flex-end;

        align-self: flex-end;           <--- overrides a flex item's align-items value; it aligns the item on the cross axis
        align-self: flex-end;
```
- flex sizing properties:
    - flex-basis - defines the initial size of an element before additional space is distributed
    - flex-grow - controls the amount of available space an element should take up; accepts a unit-less number value
    - flex-shrink - if items are larger than the container, they shrink according to flex-shrink
    - you can use all of them in one line: `flex: 2 2 10% `        <--- flex-grow | flex-shrink | flex-basis


# Responsive Design

- the website and stylesheet need to be able to respond to different device sizes and features; to do that, we use media queries
- media queries allow us to modify our style depending on particular parameters like screen width or device type
- we need to use @media
- i.e:
```css
    @media (width:800px) {
        h1 {
            color: purple;    /* <--- h1 will turn purple at exactly 800px */
        }
    }

    @media (min-width:800px) {
        h1 {
            color: purple;    /* <--- h1 will turn purple at 800px and above */
        }
    }
```
- other media features: 
```css
    max-width: 500px;
    orientation: landscape;
```
- you can combine several features using `and`:
```css
        @media (min-width:600px) and (max-width:800px) {
        h1 {
            color: purple;
        }
    }
```