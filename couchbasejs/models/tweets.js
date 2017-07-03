var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;
 
function TweetsModel() { };

module.exports = TweetsModel;

TweetsModel.getById = function(id, callback) {
    var statement = "SELECT * " +
                    "FROM `" + config.couchbase.bucket + "` AS tweets " +
                    "WHERE META(tweets).id = $1";
    var query = N1qlQuery.fromString(statement);
    db.query(query, [id], function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

TweetsModel.getAll = function(num, callback) {
    var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
                    "FROM `" + config.couchbase.bucket + "` AS w LIMIT " + num;
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

TweetsModel.getByTag = function(tag, callback) {
    var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
                    "FROM `" + config.couchbase.bucket + "` AS w WHERE w.text LIKE '%@"+tag+"%' OR w.text LIKE '%@"+tag+"%'";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

TweetsModel.getByRetweets = function(numrw, callback) {
    var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
                    "FROM `" + config.couchbase.bucket + "` AS w WHERE w.retweet_count >= " + numrw;
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

TweetsModel.getByCreated = function(date_1, date_2, callback) {
    var statement = "SELECT META(w).id, w.text, w.retweet_count, w.screen_name, w.tweet_date, w.hashtags, w.urls, w.user_mentions " +
                    "FROM `" + config.couchbase.bucket + "` AS w WHERE w.tweet_date LIKE '"+date_1+"%' OR w.tweet_date LIKE '"+date_2+"%'";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};