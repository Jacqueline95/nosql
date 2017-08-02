var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;
var ViewQuery = require('couchbase').ViewQuery;
 
function TweetsModel() { };

module.exports = TweetsModel;

TweetsModel.getById = function(id, callback) {
    var statement = "SELECT * " +
                    "FROM `" + config.couchbase.bucket + "` AS tweets " +
                   "WHERE tweets.id = " + id;
    var query = ViewQuery.from("1","alltweets").limit(id);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

TweetsModel.getAll = function(num, callback) {
    //var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
    //                "FROM `" + config.couchbase.bucket + "` AS w LIMIT " + num;
    //var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    var query = ViewQuery.from("dev_tweets","alltweets").limit(num);
    var res = db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
    res.on('end', function(meta) {
        //console.log('All rows received. Metadata is %j:', meta);
        console.log("GET /alltweets");
    });   
};

TweetsModel.getByTag = function(tag, lim, callback) {
    //var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
    //                "FROM `" + config.couchbase.bucket + "` AS w WHERE w.text LIKE '%@"+tag+"%' OR w.text LIKE '%@"+tag+"%' LIMIT 1";
    //var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    var startKey = ["#"+tag, "@"+tag];
    var endKey = [{}];
    var query = ViewQuery.from("dev_tweets","hashtags").range(startKey,endKey).limit(lim).skip(2);
    var res = db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
    res.on('end', function(meta) {
        console.log("GET /hashtags");
    });
};

TweetsModel.getByRetweets = function(numrw, lim, callback) {
    //var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
    //                "FROM `" + config.couchbase.bucket + "` AS w WHERE w.retweet_count >= " + numrw;
    // var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    var startKey = [parseInt(numrw)];
    var endKey = [{}];
    var query = ViewQuery.from("dev_tweets","retweets").range(startKey,endKey).limit(lim).skip(2);
    var res = db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
    res.on('end', function(meta) {
        console.log("GET /retweets");
    });
};

TweetsModel.getByCreated = function(date_1, date_2, lim, callback) {
    //var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
    //                "FROM `" + config.couchbase.bucket + "` AS w WHERE w.tweet_date LIKE '"+date_1+"%' OR w.tweet_date LIKE '"+date_2+"%'";
    //var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    var startKey = [date_1];
    var endKey = [date_2,{}];
    var query = ViewQuery.from("dev_tweets","created").range(startKey,endKey).limit(lim).skip(2);
    var res = db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
        
    });
    res.on('end', function(meta) {
        console.log("GET /created");
    });
};