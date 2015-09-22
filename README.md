This is a starting scaffolding for a SamsaraJS project.

## Installation

Clone the repo, then run (in the project's parent directory) 

```
git submodule update --init
```

Open `index.html` in your browser. You should see the animating SamsaraJS logo.

## Organization

The folder structure is organized as follows:

```
┌── css
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

`Samsara` is included in the `js` folder as a git submodule. The `samsara.css` file included in Samsara
is added to the CSS directory and linked to in `index.html`.

Currently, Require.js is used for module loading. The `index.html` file tells Require.js to 
begin loading from the `js/main.js` file.

In the `js` folder an `app` directory is setup for application-specific JavaScript. Similarly an `app.css` is
setup in the `css` folder. These names and locations are simply suggestions.