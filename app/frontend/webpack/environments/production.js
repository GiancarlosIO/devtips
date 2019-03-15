const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./base');

const production = merge(base, {
  stats: 'none',
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
});

module.exports = production;
