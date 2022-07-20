const express = require("express");
const path = require("path");
const app = express();
const ObjectsToCsv = require("objects-to-csv");

const host = "localhost";
const port = 3040;

app.get("/", async (req, res) => {
  const data = await csv.toDisk("./data.csv");
  console.table(data);
  res.send(data);
});

app.use((err, req, res, next) => {
  console.log(err);
  throw next();
});

app.listen(port, () => {
  console.log(`app listen http://${host + ":" + port}`);
});
