# Project: <new-project>

## How to Run the App

Instructions for running this project.

## Clone from `build-basic`?

This Section is written with the expectation that you already have installed globally node.js, gulp, browsersync and eslint

Create a new directory to be your project's repo, at your `home directory` and clone `build-basic` into it:

```
$ mkdir <new-project>
$ git clone build-basic <new-project>
```

Update and Check Outdated npm packages, by running [these commands][8] on the directory where the `package.json` file is located:

```
$ npm update
$ npm outdated
```

Create a new remote repository on [Github][9], then change the <new-project> project's remote repo from the `build-basic` repo to the  repo you just created on Github.

To change:

```
$ git remote set-url git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```

Or simply unset the remote for the <new-project> project repo:

```
$ git remote remove origin
```

Check if the remote repo has been properly set (or unset):

```
$ git remote -v
```

But, if creating a new project from scratch, follow the steps described in the next section.

## Building The Project With Node.js and a Building Tool

#### Unit Tests

The testing framework used for building this project was _Jasmine_.

In order for this framework to read the html DOM, the contents of the `index.html` file's `<body>` tag had to be added into the `SpecRunner.html` file's body, with the `<script>` tag for running the `spec/spec.js` file in the end. Also, The `<head>` tag will contain the `<link>` tag for the `css/app.css` file.

The content of the SpecRunner file should be something like this:

	```
	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <title>Jasmine Spec Runner v3.1.0</title>
	  <link rel="stylesheet" href="css/app.css">

	  <link rel="shortcut icon" type="image/png" href="node_modules/jasmine-core/images/jasmine_favicon.png">
	  <link rel="stylesheet" href="node_modules/jasmine-core/lib/jasmine-core/jasmine.css">

	  <script src="node_modules/jasmine-core/lib/jasmine-core/jasmine.js"></script>
	  <script src="node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js"></script>
	  <script src="node_modules/jasmine-core/lib/jasmine-core/boot.js"></script>


	</head>

	<body>
		<main>
			"HTML code here"
		</main>

	  <!-- include source files here... -->
	  <script src="js/app.js"></script>

	  <!-- include spec files here... -->
	  <script src="spec/spec.js"></script>
	</body>
	</html>
	```


#### Node.js and Npm (Node Package Manager)

Install [Node.js][1].

Install the latest version of [npm][2] via command line:

```
$ npm install npm@latest -g
```

To initialize a node.js project, run this at the top-level directory of your project:

```
$ npm init
```
Answer the questions that pop up on the terminal, to create a basic `package.json` file.

Install the task runner [Gulp.js][3] globally:

```
$ npm install --global gulp-cli
```

Install [Browsersync][10] globally:

```
$ npm install -g browser-sync
```

 Install locally the npm packages I'm going to use for this project (including the Gulp package), in your devDependencies:

* [gulp][4]
* [browsersync][5] (to create a server and reload the browser automaticaly)
* [jasmine][6] (tester)
* [gulp-jsdoc3][12] (Generates Documentation)

```
$ npm --install --save-dev gulp browser-sync jasmine
```

#### Jasmine Configuration

To create a `spec` directory, containing a `suport` directory, with a `jasmine.json` file inside, for general configuration purporses, run at the top level directory of your project:

```
$ node node_modules/jasmine/bin/jasmine init
```

Create a `spec.js` file, at the top level directory of your project, for your test suites.

Create a `SpecRunner.html`, at the top level directory of your project, for displaying the tests results on your browser.

#### Gulp Configuration

Create a `gulpfile.js` at the top level of your project directory, to require packages and configure tasks.

Open the `gulpfile.js` in your IDE.

Require the Gulp and Browsersync packages.

```
const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bSpecRunner = require('browser-sync').create();
const bDocumentation = require('browser-sync').create();
const jsdoc = require('gulp-jsdoc3');
```

Then set it's default task to watch the js files in the `src` directory:

Create the `default` task, with servers for the the `index.html`, the `SpecRunner.html` and the `/docs/gen/index.html` files, and creates the `jsdoc` task, for generating documentation:

```
gulp.task('default', ['jsdoc'], () => {
	// Reloads browser
	gulp.watch("*.html").on('change', bSrc.reload);
	gulp.watch("js/*.js").on('change', bSrc.reload);
	gulp.watch("*.html").on('change', bSpecRunner.reload);
	gulp.watch("js/*.js").on('change', bSpecRunner.reload);
	gulp.watch('spec/spec.js').on('change', bSpecRunner.reload);
	gulp.watch("js/*.js").on('change', bDocumentation.reload);
	gulp.watch('spec/spec.js').on('change', bDocumentation.reload);

	/** @tutorial https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch*/
	// when saving a watched file, the `jsdoc` task takes needs a second save, after a few seconds, to update the documentation
	gulp.watch("js/*.js", ['jsdoc']);
	gulp.watch('spec/spec.js', ['jsdoc']);

	// Servers
	bSrc.init({
		server: "./",
		port: 3000,
		index: "index.html",
		ui: false

	});
	bSpecRunner.init({
		server: "./",
		port: 8080,
		index: "SpecRunner.html",
		ui: false
	});
	bDocumentation.init({
		server: "./docs/gen",
		port: 8080,
		index: "index.html",
		ui: false
	});
});

// Generates documentation on the `doc` directory
gulp.task('jsdoc', function (cb) {
	gulp.src(['./README.md', './js/**/*.js', './spec/**/*.js'], {read: false})
		.pipe(jsdoc(cb));
});
```

If you want to creat a `dist` task, for copying all src files to a `dist` directory upon project completion:

```
// copies all files from the `src` directory, as well as the README.md file, to a `dist` folder
gulp.task('dist', function() {
	gulp.src(['./src/**/*','./*.md'])
		.pipe(gulp.dest('./dist'));
});

```

If you want to use SASS:

Run on terminal:

```
$ npm install --save-dev gulp-sass gulp-autoprefixer
```

And modify the `gulpfile.js`

```
const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bSpecRunner = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer('gulp-autoprefixer');

//If uses sass:
gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});
```

Also, modify the first line of the default task, adding it the task 'sass:watch':

```
gulp.task('default', ['sass:watch'], () => {
```

#### Install globally the [Eslint][7] linter:

```
$ npm install -g eslint
```

Then move to the `home directory` for your projects and run this command:


```
$ eslint --init
```

Add the enviroments you want to lint. I use this configuration on the section `"env"`, of your `.eslintrc.json` file, on the `home directory`, or on the top level of you project directory

I use this configuration on my `home directory`s `.eslintrc.json` file:

```
{
	"env": {
		"browser": true,
		"es6": true,
		"jasmine": true,
		"amd": true,
		"jquery": true,
		"node": true
    },
}
```

It will create an `eslintrc.json` file, which will contain the configurations for all your projects located at the `home directory`.

If you want to create special eslint configurations for a project, just move to that project's directory run `eslint --init`, to configure a `eslintrc.json` file there.

#### Generating Documentation With Jsdoc

The comments you wish jsdoc to parse should start with `/**`

use [jsdoc tags][11] to display each information within your comments:

```
/**
 * @file This file has tests for the app.js file.
 *
 * @author Ricardo Bossan <ricardobossan@gmail.com>
 */
```

If you wish to generate documentation manually, for each file, the documentation will be placed on an `out` directory, which will be created on the folder where is run the commands:

```
cd <./file-path/
jsdoc <./file-path/file-name>
```

#### Running The Build Tool

Run the `default` task, to automatically reload the browser window when a js file is modified (upon save). On the command line, enter:

```
$ gulp
```

Generate documentation for the project on the `doc` directory, on the top level directory of the project:

```
$ gulp jsdoc
```

======================================================================================

[1]: https://nodejs.org/en/ "Node.js"
[2]: https://www.npmjs.com/get-npm "Npm"
[3]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md "Gulp"
[4]: https://www.npmjs.com/package/gulp "Gulp on npm"
[5]: https://www.npmjs.com/package/browser-sync "Browsersync (Local)"
[6]: https://jasmine.github.io/pages/getting_started.html "Jasmine"
[7]: https://www.npmjs.com/package/eslint "Eslint"
[8]: https://docs.npmjs.com/getting-started/updating-local-packages "Update Npm Packages"
[9]: https://github.com/ "Github"
[10]: https://browsersync.io/ "Browsersync (Global)"
[11]: http://usejsdoc.org/index.html#block-tags "Jsdoc Block Tags"
[12]: https://www.npmjs.com/package/gulp-jsdoc3 "gulp-jsdoc"