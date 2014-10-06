# React + Backbone <3 Broccoli + Webpack
This is foursome between the view and presenter, [React](http://facebook.github.io/react/docs/getting-started.html) and [Backbone](http://backbonejs.org/) models who loves the client-side asset builder, [Broccoli](https://github.com/broccolijs/broccoli), along with the module bundler, [Webpack](https://github.com/webpack/webpack). WOAH! The name dropping!

### So what is this about?
This is a minimal scaffolding setup to get these delicious technologies to work well together in an easy to setup frontend workflow and distribution. This is for you if you want to build fast client side frontend applications that uses a REST API.

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

See [test](https://github.com/mlunoe/react-bb-broccoli/test) folder for examples.

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
(1) Look into [package.json/"scripts"](https://github.com/mesosphere/mandm/blob/master/frontend/package.json#L32) to see the bash commands.
