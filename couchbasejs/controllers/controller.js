var TweetsModel = require("../models/tweets.js");

var appRouter = function(app) {

    app.get("/api/tweets/:_id", function(req, res) {
        if(!req.params._id) {
            return res.status(400).send({"status": "ERROR", "message": "SE REQUIERE UN ID DEL DOCUMENTO"});
        }
        TweetsModel.getById(req.params._id, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.get("/api/alltweets/:numeroTweets", function(req, res) {
        TweetsModel.getAll(req.params.numeroTweets,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.get("/api/hashtags/:tag", function(req, res) {
        TweetsModel.getByTag(req.params.tag,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.get("/api/retweets/:num", function(req, res) {
        TweetsModel.getByRetweets(req.params.num,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.get("/api/created/:minDate&:maxDate", function(req, res) {
        TweetsModel.getByCreated(req.params.minDate,req.params.maxDate,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

};

module.exports = appRouter;