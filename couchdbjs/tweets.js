function TweetsDAO(db) {
    "use strict";
    if (false === (this instanceof TweetsDAO)) {
        console.log('TweetsDAO constructor called without "new" operator');
        return new TweetsDAO(db);
    }

    this.getAll = function(numw, num, callback) {
        "use strict";
        var numlim = numw;
        db.view('docs/alltweets',{ limit: numlim },function (err, doc) {
            //console.dir(doc);
            "use strict";

            if (err) return callback(err, null);

            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getByHashtag = function(tag, num, callback) {
        "use strict";
        var hashtag = tag;

        db.view('docs/hashtags', { key: hashtag}, function (err, doc) {
            "use strict";

            if (err) return callback(err, null);

            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getRetweets = function(num, callback) {
        "use strict";
        var numrw = num;
        db.view('docs/retweets',{ key: numrw },function (err, doc) {
            "use strict";

            if (err) return callback(err, null);

            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getByCreated = function(min, max, callback) {
        "use strict";
        console.log(min);
        console.log(max);
        var range = {
            startkey: [min],
            endkey: [max, {}]
        };
        db.view('docs/created', range, function (err, doc) {
            "use strict";

            if (err) return callback(err, null);

            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

	   });

    }

}

module.exports.TweetsDAO = TweetsDAO;
