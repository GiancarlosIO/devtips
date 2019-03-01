const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');

const base = require('./base');

const PORT = 9000;
const PUBLIC_DEVELOPMENT_PATH = `http://localhost:${PORT}/static/dist/`;
const development = merge(base, {
  output: {
    publicPath: PUBLIC_DEVELOPMENT_PATH,
    filename: '[name].min.js',
    chunkFilename: '[name].chunk.js',
  },
  devServer: {
    publicPath: PUBLIC_DEVELOPMENT_PATH,
    port: PORT,
    // hot: true, /* Dont delete this line. @nexus will include a conditional later */
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization, X-Request-With',
      'Access-Control-Allow-Credentials': 'true',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    // Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
    stats: {
      all: false,
      assets: false,
      chunks: false,
      builtAt: true,
      errors: true,
      errorsDetails: true,
      hash: false,
      modules: false,
      performance: false,
      reasons: false,
      timings: true,
      warnings: false,
      publicPath: true,
    },
    // Supress forwading of webpack logs to the browser console:
    clientLogLevel: 'none',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackNotifierPlugin(),
    /*
      We don't need to add the HotModuleReplacementPlugin here
      because the --hot flag add it.
    */
    // new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = development;
