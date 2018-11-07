'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js', '.json', '.vue']
  },
  entry: './src/index.js',
  externals: {
    'vue': {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-web-storage.min.js',
    library: 'VueWebStorage',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    // Workaround to fix umd build, restore webpack v3 behaviour
    // https://github.com/webpack/webpack/issues/6642
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new UnminifiedWebpackPlugin(),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          dead_code: true,
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }
    }),
  ],
  devtool: false,
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
  },
};
