const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const pathFolder = path.resolve(__dirname, '../src');

module.exports = {
  isProduction,
  pathFolder,
};
