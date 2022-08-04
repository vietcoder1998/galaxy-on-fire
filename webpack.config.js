const path = require('path')

module.exports = {
  mode: "development",
  entry: {
    game: path.join(__dirname, "src/scene/index.js"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  output: {
    path: path.join(__dirname, "src/build"),
    filename: "[name].bundle.js",
    clean: true,
  },
};
