# Introduction

Bootstrap = HTML, CSS and JS framework for developing responsive, mobile first projects on the web
- Bootstrap helps us quickly build responsive websites.
- it gives us access to a bunch of pre-built components that we can incorporate into our websites
- it comes with a grid system, which help us construct our own custom, responsive layouts.

# Resouces

- Resources: [Bootstrap](https://getbootstrap.com/docs/4.5/)
- first you need to Copy-paste the stylesheet `<link>` into your `<head>` before all other stylesheets to load our CSS.
```html
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
```
- in order to use all the features we need the following `<script>`s near the end of your pages, right before the closing `</body>` tag, to enable them. 
```html
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
```

# Containers

- the most basic layout element in Bootstrap and are required when using our default grid system. 
- used to contain, pad, and (sometimes) center the content within them. 
- the default .container class is a responsive, fixed-width container, meaning its max-width changes at each breakpoint.
```html
        <div class="container">
        <!-- Content here -->
        </div>
```

# Buttons

- Bootstrap includes several predefined button styles, each serving its own semantic purpose
```html
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>
```

# Typography & Utilities

- display headings: a larger, slightly more opinionated heading style
```html
    <h1 class="display-1">Display 1</h1>
    <h1 class="display-2">Display 2</h1>
    <h1 class="display-3">Display 3</h1>
    <h1 class="display-4">Display 4</h1>
```
- lead: Make a paragraph stand out by adding `lead`
```html
    <p class="lead">
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
    </p>
```
- blockquotes: For quoting blocks of content from another source within your document.
```html
    <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
    </blockquote>
```
- naming a source: 
```html
    <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
```
- alignment: Use text utilities as needed to change the alignment
```html
        <blockquote class="blockquote text-center">
            <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
```
- color:
  - .text-primary
  - .text-secondary
  - .text-success
  - .text-danger
  - .text-warning
- background color:
  - .bg-danger
- badges:   
  - Badges scale to match the size of the immediate parent element by using relative font sizing and em units.
  - Badges can be used as part of links or buttons to provide a counter.
```html
    <h1>Example heading <span class="badge badge-secondary">New</span></h1>
```
- button group: Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.
```html
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
    </div>
```
- alerts: Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
  - You can also have an option to dismiss the alarm:
```html       
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
```

# Grid System

- is the scheleton of the entire application
- it only works inside of a container
- appropriately scales up to 12 columns as the device or viewport size increases. 
- there are 6 default breakpoints: xs, sm, md, lg, xl, xxl
```html
<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
```
- Images in Bootstrap are made responsive with .img-fluid. 
- This applies max-width: 100%; and height: auto; to the image so that it scales with the parent element.
```html
<img src="..." class="img-fluid" alt="...">

<div class="container">
  <div class="row no-gutters">          <!-- Gutters are the padding between your columns -->
    <div class="col-xl-4 col-md-6">
      One of three columns
    </div>
    <div class="col-xl-4 col-md-6">
      One of three columns
    </div>
    <div class="col-xl-4 col-md-6">
      One of three columns
    </div>
  </div>
</div>
```
- utilities:
  - align-items utilities
    - to change the alignment on the cross axis 
    - Choose from start, end, center, baseline, or stretch (browser default).
    `<div class="col-xl-4 col-md-6 align-items-start">...</div>`
  - align-self utilities
    - to individually change their alignment on the cross axis
    `<div class="col-xl-4 col-md-6 align-self-end">...</div>`
  - justify content
    - to change the alignment on the main axis
    - Choose from start (browser default), end, center, between, around, or evenly.
    `<div class="col-xl-4 col-md-6 justify-content-center">...</div>`
    - Responsive variations also exist for justify-content
    `<div class="col-xl-4 col-md-6 justify-content-md-center">...</div>`


# Forms

- form-control: Give textual form controls like `<input>` and `<textarea>` an upgrade with custom styles, sizing, etc.
```html
    <form action="#nowhere">
        <div class="form-group">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
    </form>
```    
- checkbox:
```html
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Default checkbox
      </label>
    </div>
```

# Navbars

- base nav:
```html
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
```

# Bootstrap Icons

- you only need to copy-paste the svg into the project
- other source for icons: [FontAwesome](https://fontawesome.com/)
  - to use it we need to add: `<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">`


# Other Utilities

- borders
- colors
- shadows
- spacing: 
  - Assign responsive-friendly margin or padding values to an element or a subset of its sides with shorthand classes. 
  - Includes support for individual properties, all properties, and vertical and horizontal properties. 
  - Classes are built from a default Sass map ranging from .25rem to 3rem. 
  - The classes are named using the format `{property}{sides}-{size}` for xs and `{property}{sides}-{breakpoint}-{size}` for sm, md, lg, and xl.
- display
- Jumbotron = A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site
- Flex = Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. 
  - For more complex implementations, custom CSS may be necessary.
- Card = a flexible and extensible content container
- Media query: 
  - allow us to select and apply styles on different screen sizes
  - are useful when you want to modify your site or app depending on a device's general type (such as print vs. screen) or specific characteristics and parameters (such as screen resolution or browser viewport width).

