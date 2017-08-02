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
        var numlim = req.params.lim;
        posts.getByHashtag(tag, numlim, function(err, results) {
            "use strict";
            
            if(err) return res.send(500, err.message);
                console.log('GET /hashtags')
                res.status(200).jsonp(results);
            });
    }

    this.findByRetweets = function(req, res, next) {
        "use strict";

        var numrw = req.params.num;
        var numlim = req.params.lim;
        posts.getRetweets(numrw, numlim, function(err, results) {
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
        var numlim = req.params.lim;
        posts.getByCreated(min, max, numlim, function(err, results) {
            "use strict";
    
            if(err) return res.send(500, err.message);
                console.log('GET /created')
                res.status(200).send(results);
            });
    }

}

module.exports = ContentHandler;
