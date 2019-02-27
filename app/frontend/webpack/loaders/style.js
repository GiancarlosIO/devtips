const { pathFolder } = require('../configuration');

const babelLoader = {
  test: /\.(sc|sa|c)ss$/,
  // memory leaks disappear with this (I DON'T KNOW WHY!)
  include: pathFolder,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
  ],
};

module.exports = babelLoader;
