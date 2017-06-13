var express = require('express'), app = express(); // Framework web para gestionar solicitudes de enrutamiento
var cons = require('consolidate'); // Adaptador de biblioteca de plantillas para Express
var routes = require('./routes'); // Routes de la aplicación aplicación

var cradle = require('cradle'); // Driver para controlador node.js Couchdb
var methodOverride = require("method-override");
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseUrl = "prueba";
//var databaseUrl = "base_tw";

//var connection = new(cradle.Connection)('http://192.168.1.102', 5984, {
var connection = new(cradle.Connection)('http://localhost', 5984, {
      auth: { username: 'Admin', password: 'Admin' }
  });

var db = connection.database(databaseUrl);

    // Registro de plantillas
    //app.engine('html', cons.swig);
    app.set('views', __dirname + '/views');

    app.use(bodyParser.urlencoded({ extended: false }));  
    app.use(bodyParser.json());  
    app.use(methodOverride());
    app.use(cors()); 

    routes(app, db);

    app.listen(8082);
    console.log('Aplicación corriendo en: http://localhost:8082');

