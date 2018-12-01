# elementary-webpack-frontend
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features
* ES6 transpilation using [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/) with [Dashboard](https://github.com/FormidableLabs/webpack-dashboard) + [Notifier](https://github.com/Turbo87/webpack-notifier)
* [Import globbing](https://github.com/Aintaer/import-glob-loader) for SCSS
* [Polyfills](/src/scripts/polyfills.js) for older browsers — [core-js](https://github.com/zloirock/core-js), [nodelist-foreach](https://github.com/imagitama/nodelist-foreach-polyfill) & [object-fit-images](https://github.com/bfred-it/object-fit-images)
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

## Sharing localhost
Run webpack-dev-server with --host 0.0.0.0 — this lets the server listen for requests from the network, not just localhost.

Find your computer's address on the network. In terminal, type ifconfig and look for the en1 section or the one with something like inet 192.168.0.4.

On your second device on the same network, visit http://192.168.0.4:8080/ and enjoy hot reloading dev bliss.

## Build
To generate a production build, run the command:
```sh
yarn build
```
 — this will install the latest dependencies and build the project, minify scripts and stylesheets and [generally optimize](https://webpack.js.org/guides/production/) the solution for production.

The output folder is `./dist`.

The following scripts and stylesheets will be generated:
* `polyfills.js`
* `main.js`
* `main.css`

as described in the [`package.json`](/package.json) `files` field.

other assets, such as images, will be output to the `/assets` folder.


---
### Extras
#### Commands
`yarn stats` — generates a webpack `stats.json` file to help analyze bundles (in a [Visualizer](https://chrisbateman.github.io/webpack-visualizer/) or [Analyzer](http://webpack.github.io/analyse/)).

`yarn test` — runs a project-wide code style check using the [standard](https://github.com/standard/standard) package.