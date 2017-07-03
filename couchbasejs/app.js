var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var cors = require('cors');

var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket).on('error', function(err) {
  console.log('CONNECT ERROR:', err);
});

//app.use(express.static(path.join(__dirname, "public")));
 
var routes = require("./controllers/controller.js")(app);
 
var server = app.listen(3000, function () {
	console.log('Aplicación corriendo en: http://localhost:%s', server.address().port);
});
