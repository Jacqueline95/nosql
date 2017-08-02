var mongoose = require('mongoose');
var Tweets  = mongoose.model('tweets');

exports.findAll = function(req, res) {
	var numTweets = parseInt(req.params.numeroTweets);
	Tweets.find({},{id:1,text:1,retweet_count:1,screen_name:1,tweet_date:1,hashtags:1,urls:1,user_mentions:1}).limit(numTweets).exec(function(err, tweets) {
    if(err) res.send(500, err.message);
    	console.log('GET /alltweets')
    	console.log("ENCONTRADO " +  tweets.length + " REGISTROS");
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
	var lim = parseInt(req.params.lim);
    Tweets.find({ "hashtags" : { $regex: '.*'+tag+'$', $options: 'i' } },{id:1,text:1,retweet_count:1,screen_name:1,tweet_date:1,hashtags:1,urls:1,user_mentions:1}).limit(lim).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /hashtags');
    	console.log("ENCONTRADO " +  tweets.length + " REGISTROS");
		res.status(200).jsonp(tweets);
	});
};

exports.findByRetweets = function(req, res) {
	var numRetweets = req.params.num;
	var lim = parseInt(req.params.lim);
	Tweets.find({ retweet_count : { $gt: numRetweets}},{id:1,text:1,retweet_count:1,screen_name:1,tweet_date:1,hashtags:1,urls:1,user_mentions:1}).limit(lim).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /retweets');
    	console.log("ENCONTRADO " +  tweets.length + " REGISTROS");
		res.status(200).jsonp(tweets);
	});
};

exports.findByCreated = function(req, res) {
	//2014-02-25 09:00:00.000Z .... 2014-02-25 12:00:00.000Z
	//var max = new Date(""+req.params.minDate+" 00:00:00.000Z")
	//var min = new Date(""+req.params.maxDate+" 00:00:00.000Z")
	var min = req.params.minDate+" 00:00:00.000Z";
	var max = req.params.maxDate+" 23:59:59.999Z";
	var lim = parseInt(req.params.lim);
	Tweets.find({ tweet_date : { $gte: min, $lte: max}},{id:1,text:1,retweet_count:1,screen_name:1,tweet_date:1,hashtags:1,urls:1,user_mentions:1}).limit(lim).exec(function(err, tweets) {
    if(err) return res.send(500, err.message);
    	console.log('GET /created');
    	console.log("ENCONTRADO " +  tweets.length + " REGISTROS");
		res.status(200).jsonp(tweets);
	});
};













