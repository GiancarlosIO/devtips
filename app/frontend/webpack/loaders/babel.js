const { pathFolder } = require('../configuration');

const babelLoader = {
  test: /\.(js|tsx|ts)$/,
  // memory leaks disappear with this (I DON'T KNOW WHY!)
  include: pathFolder,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  ],
};

module.exports = babelLoader;
