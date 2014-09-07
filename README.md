`web-shell` is a minimal setup for building modern websites. In the most basic sense, it's a set of node-based build tools that lets a developer immediately start building a website from scratch without worrying about installing and setting up a build system.

Obviously, the web "starter kit" arena is a pretty crowded space, each solution more opinionated than the last. I chose **gulp**, **bower**, **less** and vanilla Javascript as the pillars of my typical setup, but any of these could easily be replaced/augmented in a fork by similar tools: grunt, component, sass, coffeescript, handlebars, whatever. The point is to have a "stock" dev setup in place so you don't have to write a new build configuration every time you need to make a website — but limiting what's included so you don't have to start a project by removing dependencies or deleting boilerplate code.

## Background

I'm basically using this as a replacement for the incredibly awesome [Codekit](http://incident57.com/codekit), which I highly recommend checking out. Unfortunately, as excellent as Codekit is, working with team members who don't have Codekit becomes extremely cumbersome. Using this repo as a base for standard web projects (not webapps) keeps things simple and consistent for the whole team.

---

## What's included

* a simple directory structure
* a barebones `index.html`
* a simple Gulpfile
* essential npm dependencies
	* [gulp](http://gulpjs.com) (with essential plugins)
	* [bower](http://bower.io)
	* [express](http://expressjs.com) (for in-place dev server)
* essential bower dependencies
	* [html5shiv](https://github.com/aFarkas/html5shiv)
	* [normalize.css](http://necolas.github.io/normalize.css)

## What's not included

* a bunch of boilerplate code or snippets
* a CSS or Javascript framework
* a "scaffolding" tool

---

# Usage

Requires [node](http://nodejs.org).

1. Download this repo as a .zip and extract it to a directory.
2. Open a terminal to the directory and run `npm install` followed by `bower install` (if you get `bower: command not found`, run `npm install -g bower`)
3. Use gulp to manage your builds (see next section).
4. Use bower to add external libraries, e.g. `bower install jquery --save` and then add new include paths to `scripts.json` or `styles.json`.

---

# Gulp tasks

### build (default)

`gulp` or `gulp build`

Equivalent to running `gulp scripts styles`

### clean

`gulp clean`

Deletes compiles files `scripts/site.js` and `styles/site.css`.

### compress

`gulp compress` or `gulp build && gulp compress`

Minifies `scripts/site.js` and `styles/site.css` in place.

### run

`gulp run`

Starts an express-powered development server at `localhost:29017`. Useful in conjunction with the watch task.

### scripts

`gulp scripts`

Compiles `scripts/src/site.js` to `scripts/site.js`. Edit `scripts.json` to add additional scripts.

### styles

`gulp styles`

Compiles `styles/src/site.less` to `styles/site.css`. Edit `styles.json` to add additional stylesheets.

### watch

`gulp watch` or `gulp run watch`

Starts a tinylr server on port 35729 and independently watches the scripts & styles sources for changes, recompiling as necessary and firing a `changed` trigger upon completion. Unless you're developing on an already-active server, this will probably be useless unless used in conjunction with the run task (e.g. `gulp run watch`).

---

# To do

* clean up Gulpfile when gulp 4.0 drops
