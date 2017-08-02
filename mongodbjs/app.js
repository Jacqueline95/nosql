var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var cors = require('cors');

// CONEXIÓN A LA BASE DE DATOS
//mongoose.connect('mongodb://192.168.1.101:27025,192.168.1.102:27026/db_tweets', {mongos: true}, function(err, res) {
mongoose.connect('mongodb://192.168.1.101:27052/db_tweets', function(err, res) {
if(err) throw err;
 console.log('Conexión establecida');
});

// MIDDLWARES
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.use(cors()); 

// IMPORTAR MODELO Y CONTROLADORES
var models     = require('./models/models')(app, mongoose);
var Controller = require('./controllers/controller');

var router = express.Router();

// INDEX ROUTE
router.get('/', function(req, res) {  
   res.send("API REST MONGODB");
});

app.use(router);

// API ROUTES
var api = express.Router();

api.route('/alltweets/:numeroTweets')  
  .get(Controller.findAll)

api.route('/tweets/:id')  
  .get(Controller.findById)

api.route('/hashtags/:hashtag&:lim')  
  .get(Controller.findByHash)

api.route('/retweets/:num&:lim')  
  .get(Controller.findByRetweets)

api.route('/created/:minDate&:maxDate&:lim')  
  .get(Controller.findByCreated)

app.use('/api', api);  

app.listen(3000, function() {
  console.log("Aplicación corriendo en: http://192.168.1.101:3000");
});