const path = require('path')

module.exports = {
  mode: "development",
  entry: path.join(__dirname,"src", "game.js"),
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  output: {
    path: path.join(__dirname, "src" ),
    filename: "bundle.js",
    clean: false,
  },
};
