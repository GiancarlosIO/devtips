const merge = require('webpack-merge');

const base = require('./base');

const production = merge(base, {
  stats: 'none',
  mode: 'production',
});

module.exports = production;
