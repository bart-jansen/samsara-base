This is a starting scaffolding for a [SamsaraJS](http://samsaraJS.org) project. It contains the code to run
the [SamsaraJS logo](http://samsara-logo.s3-website.eu-central-1.amazonaws.com/).

## Installation

Clone the repo, then run (in the project's parent directory):

```
git submodule update --init
```

Open `index.html` in your browser. That's it!

You should see the animating SamsaraJS logo. 
Try resizing the page, you'll notice the logo itself resizes while still animating. 
Behold the power of streams!

## Documentation

If you open `docs/main.html` in your browser you will see pretty documentation, rendered with [docco](https://jashkenas.github.io/docco/).

## Organization

The folder structure is organized as follows:

```
┌── docs
│   ├── main.html
│   └── Wedge.html
├── css
│   ├── app.css
│   └── samsara.css
├── js
│   ├── app
│   │   └── Wedge.js
│   ├── lib
│   │   └── require.js
│   ├── main.js
│   └── samsara
└── index.html
```

`Samsara` is included in the `js` folder as a git submodule. The `samsara.css` stylesheet included in `samsara/core`
is added to the CSS directory and linked to in `index.html`.

Currently, [Require.js](http://www.requirejs.org/) is used for module loading. The `index.html` file tells `require.js` to 
begin loading from the `js/main.js` file. This is the starting point of the application. Begin hacking here!

In the `js` folder an `app` directory is setup for application-specific JavaScript. Similarly an `app.css` is
setup in the `css` folder. These names and locations are simply suggestions.