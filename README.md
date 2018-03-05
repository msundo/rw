# elementary-webpack-frontend
A simple webpack configuration made for non-SPA solutions at Addition
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features
* ES6 transpilation using [Babel](https://babeljs.io/)
* Webpack [Dashboard](https://github.com/FormidableLabs/webpack-dashboard) + [Notifier](https://github.com/Turbo87/webpack-notifier)
* [Import globbing](https://github.com/Aintaer/import-glob-loader) for SCSS
* [Default Polyfills](https://github.com/zloirock/core-js)
* [Bootstrap 3](https://getbootstrap.com/) (but only with a [few features enabled](blob/master/src/styles/bootstrap.scss) — optimized for performance)
* [Handlebars](http://handlebarsjs.com/) templating

## Getting Started

1. Install dependencies
```sh
yarn install
```
2. Start local webserver
```sh
yarn run dev
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