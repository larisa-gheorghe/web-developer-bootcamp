# Introduction

- HyperText Markup Language - defines the STRUCTURE of a webpage
- resources:
    - https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
    - https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

## Command Shortcuts

- Copy current line to the next one: `Shift+Alt+DownArrow`  
- Comment lines: `CTRL+K+C`
- Show Command Palette: `Shift+Ctrl+P`
- Add to multiples rows: `Alt+Click`
- [Cheat Sheet](docs.emmet.io/cheat-sheet)

## General Rule
```
<tagname> Content </tagname>
<!-- used to write comments -->   
```

# Elements

- are case-insensitive
- nesting = to place elements within other elements
- block-level elements = form a visible block on a page;
    - they are usually structural elements (paragraphs, lists, navigation menus, footers);
    - any content that follows a block-level element appears on a new line;
    - browsers typically display the block-level element with a newline both before and after the element;
    - they might be nested inside other block-level elements;
- inline elements = are contained within block-level elements;
    - surround only small parts of content;
    - will not cause a new line to appear (ie `<a>`, `<em>`, `<strong>`).
- empty elements = void elements
    - consist of a single tag used to insert/embed something in the document


# Attributes

- elements can have attributes
- contain extra info about the element that won't appear in the content
-i.e `<tag name="value"> Content </tag>`
- boolean attributes = attributes that can only have one value;
    - can be written without values;
- whitespace - No matter how much whitespace you use inside HTML element content the HTML parser reduces each sequence of 
    - whitespace to a single space when rendering the code.
```html
<img src="">
<a href="" target="_blank">
<table border="">
```

# HTML page format
```html
<!DOCTYPE html>             <------ To indicate that the HTML content uses HTML5
<html>                      <------ the root (top-level element) of an HTML document, so it is also referred to as the root element.
                                     All other elements must be descendants of this element.
<head>                      <------ One head element permitted.
                                    contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.
    <title>Document</title>
</head>
<body>                      <------ One body element permitted. 
                                    the content of an HTML document
    
</body>
</html>
```

# Tags

- documentation: [HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

- `<p>`: paragraph
- `<em>`: emphasis text formatting
- `<strong>`: stronger text formatting
- `<a>`: hyperlink
- `<div>`: generic container for flow content (a way of grouping things together); 
    - block level element
    - used to group elements for styling purposes, or because they share attribute values
    - specific elements instead of divs: `<section> <article> <nav> <main> <header> <footer> <aside> <summary> <details>`
- `<span>`: generic inline container for phrasing content
    - used to group elements for styling purposes, or because they share attribute values
- `<hr>`: a thematic break between paragraph-level elements
- `<br>`: produces a line break in text
- `<sup>`: superscript element; specifies inline text which is to be displayed as superscript
- `<sub>`: subscript element; specifies inline text which should be displayed as subscript

# HTML Entities

- documentation: 
    - [Charref](https://dev.w3.org/html5/html-author/charref)
    - [Entity Code](https://entitycode.com/)
- start with an ampersand and end with a semicolon
- used to display reserved characters, that normally would be invalid
- used in place of difficult to type characters
- the browser interprets them and renders the correct character instead
- i.e: 
`&lt;`   ('less than' character)   <--- entity name
`&#60;`  ('less than' character)   <--- entity number


# Lists

- ordered list: `<ol> </ol>`
    - list items: `<li> </li>`
- unordered list: `<ul> </ul>`
    - list items: `<li> </li>`


# Tables
```
<table>
<tr>
    <th> </th>          <--- defines a cell as header of a group of table cells
</tr>
    <tr>                <--- table  row
        <td></td>       <--- table data cell
    </tr>
</table>
```
- In HTML5:
```
<table>

<thead>                 <--- a set of rows defining the head of the columns of the table.
    <tr>
        <th rowspan="2"> </th>              <--- rowspan = for how many rows the cell extends      
        <th colspan="2"> </th>              <--- colspan = for how many columns the cell extends
    </tr>
</thead>

<tbody>                 <--- a set of table rows (<tr> elements), indicating that they comprise the body of the table (<table>)
    <tr>                
        <td></td>     
    </tr>
</tbody>

<tfoot>                 <--- a set of rows summarizing the columns of the table
    <tr>                
        <td></td>     
    </tr>
</tfoot>

</table>
```

# Forms
```html
<form action="/my-form-submitting-page" method="post">
    <!-- All our inputs will go in here-->
    <input type="text">
    <input type="password">
    <input type="date">
    <input type="color">
    <input type="file">
    <input type="checkbox">
    <input type="submit">   <!-- <---button; you can also use <button></button> tag -->
</form>
```
- form = a continer where we put our inputs
- action: the URL to send form data to
- method: the type of HTTP request
- `<input>`: used to create interactive controls for web-based forms in order to accept data from the user
- `placeholder=""` attribute: to temporarly fill the box until user input 
    - `<input type="text" placeholder="Username">`

# Labels

- they let us add captions to individual elements in our form
```html
<form>
    <label> 
       Content 
      <input type="">
    </label>
    <button> Content </button>
</form>
```
or
```html
<form>
    <label for=""> Content </label>  
    <input id="" type="">
    <button> Content </button>
</form>
```

# Simple Validations

- the 'required' attribute validates that an input is not empty
- 'required' is a boolean attribute   <---this will not work on any browser
- there are also type validations
- types of validations:     
    - Presence validation
    - Data type (format) validation


# Dropdowns & Radio Buttons

- radio button: `<input type="radio">`
- checkbox: `<input type="checkbox">`
```html
<form>
    <label for="">Content</label>
    <input name="same_name" id="" type="radio" value="">    <-- We need to put the same name if we want to connect them and choose only one
    <input name="same_name" id="" type="radio" value="">

    <label for="">Content</label>
    <input name="same_name" id="" type="radio" value="">     <--- add the value to "same_name" attribute
    <button>Go!</button>
</form>
```
- dropdown menu: `<select></select>`
- `<option>` tag: for every possible option that we want our user to pick we add an option tag

- `<textarea>` element represents a multi-line plain-text editing control
    - useful when you want to allow users to enter a sizeable amount of free-form text
    - for example a comment on a review or feedback form.