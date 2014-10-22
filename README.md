# React + Backbone <3 Broccoli
This is threesome between the view and presenter, [React](http://facebook.github.io/react/docs/getting-started.html) and [Backbone](http://backbonejs.org/) models who loves the client-side asset builder, [Broccoli](https://github.com/broccolijs/broccoli).

### So what is this about?
This is a minimal skeleton, scaffolding setup and developer environment to get these delicious technologies to work well together, in an easy to setup frontend workflow and distribution. This is for you if you want to build fast client side frontend applications that uses a REST API.

### Modular structure
The project is build with a modular structure, so only React depends on the Bacbone models:

* Broccoli.js file and its build dependency node modules can be replaced with, say Grunt or Gulp.
* If you don't need the tests, or have your own setup the "test" folder can be trashed with its dependent node modules.
* The React files can also be removed and be replaced with something else.
* The Backbone models are embedded into to React files, so if these are not needed both React and Backbone should be removed - though this sort of removes the purpose of this library.

### Setup development environment
Run the following commands install dependencies for setting up the [Broccoli](https://github.com/broccolijs/broccoli) development environment [(1)](https://github.com/mlunoe/react-bb-broccoli#footnotes):

	npm install
	npm install -g broccoli-cli

	npm run serve

Open up a browser on `localhost:4200` and watch the magic!


### Build and release
Run the following command to distribute the project into the `target/app` folder [(1)](https://github.com/mlunoe/react-bb-broccoli#footnotes):

	npm run test
	npm run clean
	npm run build

A `target/app` folder will be created with minimized content.

### Test
Run the unit tests [(1)](https://github.com/mlunoe/react-bb-broccoli#footnotes):

	npm test

See [test](https://github.com/mlunoe/react-bb-broccoli/tree/master/test) folder for examples.

You can also run the following command to watch for changes, though it only works for .js files [(1)](https://github.com/mlunoe/react-bb-broccoli#footnotes):

	npm run test-watch

### Development Setup (Sublime Text)

1. Add the following to your Sublime Text User Settings

		{
			...
			"rulers": [80], // lines no longer than 80 chars
			"tab_size": 2, // use two spaces for indentation
			"translate_tabs_to_spaces": true, // use spaces for indentation
			"ensure_newline_at_eof_on_save": true, // add newline on save
			"trim_trailing_white_space_on_save": true, // trim trailing white space on save
			"default_line_ending": "unix"
		}

2. Add Sublime-linter with jshint & jsxhint
	1. Make sure to follow installation instructions for all packages, or they won't work:

	2. Installing SublimeLinter is straightforward using Sublime Package Manager, see [instructions](http://sublimelinter.readthedocs.org/en/latest/installation.html#installing-via-pc)

	3. SublimeLinter-jshint needs a global jshint in your system, see [instructions](https://github.com/SublimeLinter/SublimeLinter-jshint#linter-installation)

	4. SublimeLinter-jsxhint needs a global jsxhint in your system, as well as JavaScript (JSX) bundle inside Packages/JavaScript, see [instructions](https://github.com/SublimeLinter/SublimeLinter-jsxhint#linter-installation)

	5. ~~SublimeLinter-csslint needs a global csslint in your system, see [instructions](https://github.com/SublimeLinter/SublimeLinter-csslint#linter-installation)~~

### Footnotes
(1) Look into [package.json/"scripts"](https://github.com/mlunoe/react-bb-broccoli/blob/master/package.json#L37) to see the bash commands.
