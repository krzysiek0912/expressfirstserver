const express = require("express"),
  fs = require("fs"),
  bodyParser = require("body-parser");

const app = express();

let stringifyFile;

fs.readFile("./data.json", "utf8", function(err, data) {
  if (err) throw err;
  stringifyFile = data;
});

app.use("/store", function(req, res, next) {
  console.log("Jestem pośrednikiem przy żądaniu do /store");
  next();
});

app.use(function(req, res, next) {
  console.log("Hej, jestem pośrednikiem między żądaniem a odpowiedzią!");
  next();
});

app.use(bodyParser.json());
app.use(express.static("assets"));

app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

app.get("/store", function(req, res) {
  res.send("To jest sklep");
});

app.get("/userform", function(req, res) {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.json(response);
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

var server = app.listen(3000, "localhost", function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    "Przykładowa aplikacja nasłuchuje na http://" + host + ":" + port
  );
});
