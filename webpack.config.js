const path = require('path')

module.exports = {
  mode: "development",
  entry: path.join(__dirname, './engine', 'index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: "bundle.js",
    clean: true,
  },
};
