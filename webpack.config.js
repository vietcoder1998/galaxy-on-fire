const { readdirSync } = require("fs");
const path = require("path");

const files = (async () => {
  const files = await readdirSync(path.join(__dirname, "engine"));
  const results = {};
  const mapper = files.map((item) => path.resolve(__dirname, "engine", item));
  mapper.forEach((file, i) => Object.assign(results, { [i]: file }));

  console.log(results);
  return results;
})();

const exportFile = {
  entry: files,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

module.exports = {
  ...exportFile,
};
