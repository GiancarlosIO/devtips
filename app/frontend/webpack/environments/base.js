const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


const {
  isProduction,
} = require('../configuration');

const loaders = require('../loaders');

const base = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'eval-source-map',
  optimization: {
    removeAvailableModules: isProduction,
    removeEmptyChunks: isProduction,
    splitChunks: {
      name: !isProduction,
      chunks: 'async',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
    minimizer: isProduction ? [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ] : [],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.graphql', '.js'], // the .js one should be always here!
    alias: {
      react: path.resolve(__dirname, '../../../../node_modules/react'),
      'styled-components': path.resolve(__dirname, '../../../../node_modules/styled-components'),
      'src': path.resolve(__dirname, '../../src'),
    },
  },
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../../dist'),
    publicPath: '/static/dist',
    pathinfo: false,
    filename: `[name]${isProduction ? '.[hash:8]' : ''}.min.js`,
    chunkFilename: `[name]${isProduction ? '.[chunkhash:8]' : ''}.chunk.min.js`,
  },
  module: {
    rules: loaders,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'STATIC_URL': JSON.stringify('/static/'),
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../../../core/templates/react-template.html'),
      template: path.join(__dirname, '../../../core/templates/base.html'),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};

module.exports = base;