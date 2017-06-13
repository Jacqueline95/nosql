var mongoose = require('mongoose');
var Tweets  = mongoose.model('tweets');

exports.findAll = function(req, res) {
	var numTweets = parseInt(req.params.numeroTweets);
	Tweets.find({},{id_str:1,hashtags:1}).limit(numTweets).exec(function(err, tweets) {
    if(err) res.send(500, err.message);
    	console.log('GET /alltweets')
		res.status(200).jsonp(tweets);
	});
};

exports.findById = function(req, res) {
	Tweets.findById(req.params.id, function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /tweets/' + req.params.id);
		res.status(200).jsonp(tweets);
	});
};

exports.findByHash = function(req, res) {
	//Tweets.findOne({ "text" : { $regex: /MauricioRodas/, $options: 'i' } },{id:1}, function(err, tweets) {
    //Tweets.findOne({ "hashtags" : { $regex: /SOCIALWEB/, $options: 'i' } }, function(err, tweets) {
    var tag = req.params.hashtag;
    Tweets.find({ "hashtags" : { $regex: '.*'+tag+'$', $options: 'i' } },{id_str:1,text:1,hashtags:1}).limit(100).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /hashtags')
		res.status(200).jsonp(tweets);
	});
};

exports.findByRetweets = function(req, res) {
	var numRetweets = req.params.num;
	Tweets.find({ retweet_count : { $gt: numRetweets}},{id:1,text:1,retweet_count:1,hashtags:1,urls:1}).limit(100).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /retweets')
		res.status(200).jsonp(tweets);
	});
};

exports.findByCreated = function(req, res) {
	//2014-02-25 09:00:00.000Z .... 2014-02-25 12:00:00.000Z
	var max = new Date(""+req.params.minDate+" 00:00:00.000Z")
	var min = new Date(""+req.params.maxDate+" 00:00:00.000Z")
	Tweets.find({ tweet_date : { $gte: max, $lte: min}},{id:1,text:1,retweet_count:1,screen_name:1,tweet_date:1,hashtags:1,urls:1,user_mentions:1}).limit(30).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /created')
		res.status(200).jsonp(tweets);
	});
};





























