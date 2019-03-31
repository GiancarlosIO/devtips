const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const { isProduction } = require('../configuration');
const loaders = require('../loaders');

const base = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'eval-source-map',
  optimization: {
    removeAvailableModules: isProduction,
    removeEmptyChunks: isProduction,
    runtimeChunk: 'single',
    splitChunks: {
      name: !isProduction,
      chunks: 'async',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](react|react-dom|styled-components|urql|@reach\/router)[\\/]/,
          chunks: 'all',
        },
      },
    },
    minimizer: isProduction
      ? [
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
        ]
      : [],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.graphql', '.js', '.mjs'], // the .js one should be always here!
    alias: {
      // path react-hot-loader
      'react-dom': isProduction
        ? path.resolve(__dirname, '../../../../node_modules/react-dom')
        : '@hot-loader/react-dom',
      react: path.resolve(__dirname, '../../../../node_modules/react'),
      'styled-components': path.resolve(
        __dirname,
        '../../../../node_modules/styled-components',
      ),
      src: path.resolve(__dirname, '../../src'),
    },
  },
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../../../core/static/js'),
    publicPath: isProduction
      ? 'https://devtipsgio.s3.amazonaws.com/static/js/'
      : '/static/js/',
    pathinfo: false,
    filename: `[name]${isProduction ? '.[hash:8]' : ''}.min.js`,
    chunkFilename: `[name]${isProduction ? '.[chunkhash:8]' : ''}.chunk.min.js`,
  },
  module: {
    rules: [
      ...loaders,
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      STATIC_URL: JSON.stringify('/static/'),
    }),
    new HtmlWebpackPlugin({
      filename: path.join(
        __dirname,
        '../../../core/templates/react-template.html',
      ),
      template: path.join(__dirname, '../../../core/templates/base.html'),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};

if (process.argv.includes('--analyzer')) {
  const plugin = new BundleAnalyzerPlugin();

  base.plugins.push(plugin);
}

module.exports = base;
