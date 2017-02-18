// DEPENDENCIES -- place required modules at the beginning JavaScript files
var express = require("express"); // Framework for web apps
var cors = require("cors");
var bodyParser = require("body-parser");
var rest = require("./rest.js");

// ENVIRONMENT VARIABLES
const port = process.env.PORT || 2000;

// INITIALIZE EXPRESS
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", rest);

// START EXPRESS
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});