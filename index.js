const express = require("express"),
  fs = require("fs"),
  bodyParser = require("body-parser");

const app = express();

let stringifyFile;

fs.readFile("./data.json", "utf8", function(err, data) {
  if (err) throw err;
  stringifyFile = data;
});

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/getNote", function(req, res) {
  res.send(stringifyFile);
});

app.post("/getNote/:note", function(req, res) {
  stringifyFile += req.params.note;
  fs.writeFile("./data.json", stringifyFile, function(err) {
    if (err) throw err;
    res.send("file updated");
  });
});

app.use(function(req, res, next) {
  res.status(404).send("Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!");
});

const server = app.listen(3000, function() {
  console.log("URL: http://localhost:3000");
});