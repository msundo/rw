import path from 'path'
import Webpack from 'webpack'
import Notifier from 'webpack-notifier'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const production = process.env.NODE_ENV === 'production'
const output = path.resolve(__dirname, 'dist')

/** 📃 .hbs pages filenames without extensions */
const pages = ['index']

export default {
  entry: './src/scripts/index.js',
  output: {
    path: output,
    filename: 'coop-map-integration.js'
  },
  devtool: production ? false : 'eval-source-map',
  plugins: [
    ...pages.map(page => new HtmlPlugin({ filename: `${page}.html`, template: `src/${page}.hbs` })),
    new ScriptExtHtmlWebpackPlugin({
      defer: 'main.js',
      async: 'polyfills.js'
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version)
    }),
    new ExtractTextPlugin({ filename: 'coop-map-integration.css' }),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, './src/robots.txt'), to: output }, { from: path.resolve(__dirname, 'src/assets/images'), to: 'assets/images' }])
  ].concat(production
    ? [ // 🚢  production plugins
      new CleanWebpackPlugin([output]),
      new Webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
    ]
    : [ // 🏗️  development plugins
      new Webpack.HotModuleReplacementPlugin(),
      new Notifier()
    ]),
  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: 'import-glob-loader'
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/'
        }
      }
    ]
  }
}
