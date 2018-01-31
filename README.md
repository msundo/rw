# elementary-webpack-frontend
A simple webpack configuration made for non-SPA solutions at Addition

## Features
* Handlebars Templating
* ES6 Transpilation with Babel
* Webpack Dashboard + Notifier
* Import Globbing for SCSS
* Default Polyfills
* Bootstrap (but only with a few features enabled — to optimize performance)

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

## Deploying
When deploying to production run the command `yarn run build` — it will build the project, minify scripts and styles and generally optimize the solution for production.

The output folder is `/dist`.