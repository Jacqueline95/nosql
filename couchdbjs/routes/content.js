var TweetsDAO = require('../tweets').TweetsDAO
  , sanitize = require('validator').sanitize;

function ContentHandler (db) {
    "use strict";

    var posts = new TweetsDAO(db);

    this.findAll = function(req, res, next) {
        "use strict";

        var numw = req.params.numeroTweets;
        posts.getAll(numw,10,function(err, results) {
            "use strict";
    
            if(err) return res.send(500, err.message);
                console.log('GET /alltweets')
                res.status(200).jsonp(results);
            });
    }

    this.findByHash = function(req, res, next) {
        "use strict";

        var tag = req.params.hashtag;
        posts.getByHashtag(tag, 10, function(err, results) {
            "use strict";
            console.log('this is a single post -->>'+results); 
    
            if(err) return res.send(500, err.message);
                console.log('GET /hashtags')
                res.status(200).jsonp(results);
            });
    }

    this.findByRetweets = function(req, res, next) {
        "use strict";

        var numrw = req.params.num;
        posts.getRetweets(numrw,function(err, results) {
            "use strict";
    
            if(err) return res.send(500, err.message);
                console.log('GET /retweets')
                res.status(200).jsonp(results);
            });
    }
    this.findByCreated = function(req, res, next) {
        "use strict";

        var min = req.params.minDate;
        var max = req.params.maxDate;
        console.log(min);
        posts.getByCreated(min,max,function(err, results) {
            "use strict";
    
            if(err) return res.send(500, err.message);
                console.log('GET /created')
                res.status(200).jsonp(results);
            });
    }

}

module.exports = ContentHandler;
