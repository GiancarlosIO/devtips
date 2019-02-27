const { pathFolder } = require('../configuration');

module.exports = {
  test: /\.(graphql|gql)$/,
  // memory leaks disappear with this
  include: pathFolder,
  loader: 'graphql-tag/loader',
};
