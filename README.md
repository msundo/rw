# elementary-webpack-frontend
A simple webpack configuration made for non-SPA solutions at Addition

## Features
* Handlebars Templating
* ES6 Transpilation with Babel
* Webpack Dashboard + Notifier
* Import Globbing for SCSS
* Default Polyfills

## Getting started

1. Install dependencies
```sh
yarn install
```
2. Start local webserver
```sh
yarn run dev
```
That's it!

## Production
When deploying to production run the command `yarn run build` — it will build the project, minify scripts and styles and generally optimize the solution.

The output folder is `/dist`