const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'client/src/app');
const BUILD_DIR = path.resolve(__dirname, 'client/static');
const STYLE_DIR = path.resolve(__dirname, 'client/stylesheets');

let config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss$/,
        include: STYLE_DIR,
        loaders: ["style-loader", "css-loader", "sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")]
      }
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
          'node_modules'
        ]
    }
  }
};

module.exports = config;
