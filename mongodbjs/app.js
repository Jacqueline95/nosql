var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var cors = require('cors');

// CONEXIÓN A LA BASE DE DATOS
//mongoose.connect('mongodb://192.168.1.101:27025/db_tweets', function(err, res) {
mongoose.connect('mongodb://192.168.1.102:27051/db_tweets', function(err, res) {
//mongoose.connect('mongodb://localhost/Tweepy', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
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

api.route('/hashtags/:hashtag')  
  .get(Controller.findByHash)

api.route('/retweets/:num')  
  .get(Controller.findByRetweets)

api.route('/created/:minDate&:maxDate')  
  .get(Controller.findByCreated)

app.use('/api', api);  

app.listen(3000, function() {
  console.log("Aplicación corriendo en: http://localhost:3000");
});