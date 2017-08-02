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
            console.log("ENCONTRADOS " + result.length + " REGISTROS");
        });
    });

    app.get("/api/hashtags/:tag&:lim", function(req, res) {
        TweetsModel.getByTag(req.params.tag,req.params.lim,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
            console.log("ENCONTRADOS " + result.length + " REGISTROS");
        });
    });

    app.get("/api/retweets/:num&:lim", function(req, res) {
        TweetsModel.getByRetweets(req.params.num,req.params.lim,function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            if(error) return res.send(500, error.message);
            res.status(200).jsonp(result);
            console.log("ENCONTRADOS " + result.length + " REGISTROS");
        });
    });
    
    app.get("/api/created/:minDate&:maxDate&:lim", function(req, res) {
        TweetsModel.getByCreated(req.params.minDate,req.params.maxDate,req.params.lim,function(error, result, body) {
            if(error) {
                return res.status(400).send(error);
            }
            if(error) return res.send(500, error.message);
                res.status(200).jsonp(result);
                console.log("ENCONTRADOS " + result.length + " REGISTROS");
        });
    });
};

module.exports = appRouter;