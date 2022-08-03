const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  mode: "development",
  entry: {
    scene1: path.join(__dirname, "src/scene/1", "GameScene1.js"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  output: {
    path: path.join(__dirname, "src/build"),
    filename: "[name].js",
    clean: false,
  },
  plugins: [new HtmlWebpackPlugin()],
};
