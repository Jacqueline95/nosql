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
            "use strict";

            if (err) return callback(err, null);
            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getByHashtag = function(tag, lim, callback) {
        "use strict";
        var hashtag = tag;
        var numlim = lim;
        db.view('docs/hashtags', {startkey: ["#"+tag, "@"+tag], endkey: [{}], limit: numlim }, function (err, doc) {
        //db.view('docs/hashtags', {startkey: [tag], endkey: {}, limit: numlim, options: {collation: "raw"}}, function (err, doc) {
            "use strict";

            if (err) return callback(err, null);
            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getRetweets = function(num, lim, callback) {
        "use strict";
        var numrw = num;
        var numlim = lim;
        
        db.view('docs/retweets',{ key: numrw, limit: numlim },function (err, doc) {
            "use strict";

            if (err) return callback(err, null);
            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

       });
    }

    this.getByCreated = function(min, max, lim, callback) {
        "use strict";

        var numlim = lim;
        db.view('docs/created', {startkey: [min], endkey: [max, {}], limit: numlim}, function (err, doc) {
            "use strict";

            if (err) return callback(err, null);
            console.log("ENCONTRADO " + doc.length + " REGISTROS");

            callback(null, doc);

	   });

    }

}

module.exports.TweetsDAO = TweetsDAO;
