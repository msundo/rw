# elementary-webpack-frontend
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple webpack configuration made for non-SPA solutions at Addition

## Features
* ES6 transpilation using [Babel](https://babeljs.io/)
* Webpack [Dashboard](https://github.com/FormidableLabs/webpack-dashboard) + [Notifier](https://github.com/Turbo87/webpack-notifier)
* [Import globbing](https://github.com/Aintaer/import-glob-loader) for SCSS
* [Default Polyfills](https://github.com/zloirock/core-js)
* [Bootstrap 3](https://getbootstrap.com/) (but only with a [few features enabled](/src/styles/bootstrap.scss) — optimized for performance)
* [Useful SCSS Mixins](/src/styles/mixins.scss)
* [Handlebars](http://handlebarsjs.com/) templating
* [StandardJS](https://github.com/standard/standard) code styling

## Getting Started

#### Pre-dependencies
Every command here should be executed in [node](https://nodejs.org/en/) and requires having the [yarn package manager](https://yarnpkg.com/en/) installed globally.

#### Start development
1. Install dependencies
```sh
yarn install
```
2. Start local webserver
```sh
yarn dev
```
That's it! 🙌

##  Build

To generate a production build: run the command `yarn build` — it will build the project, minify scripts and stylesheets and [generally optimize](https://webpack.js.org/guides/production/) the solution for production.

The output folder is `./dist`.

The following scripts and stylesheets will be generated:
* `polyfills.js`
* `main.js`
* `main.css`

as described in the `package.json` files field.