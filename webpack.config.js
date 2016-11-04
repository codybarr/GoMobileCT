var debug = process.env.NODE_ENV !== "production";
// var debug = true;
var webpack = require('webpack');
var path = require('path');

// Sass

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('stylesheets/main.css');

module.exports = {
  context: path.join(__dirname, "client"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
    "./client.js",
    "./public/stylesheets/base.scss"
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.scss$/i,
        loader: extractCSS.extract(['css','sass'])
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "client.min.js"
  },
  plugins: debug ? [extractCSS] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    extractCSS
  ],
};
