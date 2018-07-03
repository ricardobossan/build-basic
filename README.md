<!--
@todo:
*
* Create a new `build basic" project, with build for src directory, gulp, browsersync, jasmine and the README.md file, modifying it with [instructions](https://docs.npmjs.com/getting-started/updating-local-packages) for updating your npm packages everytime the `build basic` project is cloned, for a new basic project, and for running the `dist` task, and also modify the gulpfile.js, with the `dist` task.
	* Fill instructions for the `Change or unset the remote repository`, in `Section  Clone from \`build-basic\`?`
	* create a remote repo at https://github.com
	* set the upstream origin branch to the url created on github
	* run add and commit changes in git
	* push commited changes
-->
# Project: Cat Clicker

## How to Run the App

Instructions for running this project.

## Clone from `build-basic`?

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

Create a new remote repository on [Github][9], then change the `new-project`'s remote repo from the `build-basic` repo to the  repo you just created on Github.

To change:

```
$ git remote set-url git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```

Or simply unset the remote for the `new-project` repo:

```
$ git remote remove origin
```

But, if creating a new project from scratch, follow the steps described in the next section.

## Building The Project With Node.js and a Building Tool

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
 Install locally the npm packages I'm going to use for this project (including the Gulp package), in your devDependencies:

* [Gulp][4]
* [Browsersync][5] (to create a server and reload the browser automaticaly)
* [Jasmine][6] (tester)

```
$ npm --install --save-dev gulp browser-sync jasmine
```

#### Jasmine Configuration

To create a `spec` directory, containing a `suport` directory, with a `jasmine.json` file inside, for general configuration purporses, run at the top level directory of your project:

```
$ node node_modules/jasmine/bin/jasmine init
```

Create a `spec.js` file, in the `spec` folder, at the top level directory of your project, for your test suites.

Create a `SpecRunner.html`, in the `spec` folder, at the top level directory of your project, to display the test results on your browser.

#### Gulp Configuration

Create a `gulpfile.js` at the top level of your project directory, to require packages and configure tasks.

Open the `gulpfile.js` in your IDE.

Require the Gulp and Browsersync packages.

```
const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bSpecRunner = require('browser-sync').create();
```

Then set it's default task to watch the js files in the `src` directory:

Create the `default` task, with servers for the the `index.html` the `spec/SpecRunner.html` files:

```
gulp.task('default', () => {
	// Reloads browser
	gulp.watch("*.html").on('change', bSrc.reload);
	gulp.watch("js/*.js").on('change', bSrc.reload);
	gulp.watch('spec/spec.js').on('change', bSrc.reload);
	gulp.watch("*.html").on('change', bSpecRunner.reload);
	gulp.watch("js/*.js").on('change', bSpecRunner.reload);
	gulp.watch('spec/spec.js').on('change', bSpecRunner.reload);

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
		index: "spec/SpecRunner.html",
		ui: false
	});
});
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


#### Running The Build Tool

* run the `default` task, to automatically reload the browser window when a js file is modified (upon save). On the command line, enter:

```
$ gulp
```

[1]: https://nodejs.org/en/ "Node.js"
[2]: https://www.npmjs.com/get-npm "Npm"
[3]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md "Gulp"
[4]: https://www.npmjs.com/package/gulp "Gulp on npm"
[5]: https://www.npmjs.com/package/browser-sync "Browsersync"
[6]: https://jasmine.github.io/pages/getting_started.html "Jasmine"
[7]: https://www.npmjs.com/package/eslint "Eslint"
[8]: https://docs.npmjs.com/getting-started/updating-local-packages "Update Npm Packages"
[9]: https://github.com/ "Github"