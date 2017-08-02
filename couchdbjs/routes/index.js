var  ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var handler = new ContentHandler(db);

    app.get('/alltweets/:numeroTweets', handler.findAll);

    app.get('/hashtags/:hashtag&:lim', handler.findByHash);

    app.get('/retweets/:num&:lim', handler.findByRetweets);

    app.get('/created/:minDate&:maxDate&:lim', handler.findByCreated);

    app.use(ErrorHandler);
}
