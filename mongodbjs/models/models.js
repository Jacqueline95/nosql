var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var clientSchema = new Schema({  
  _id:    { type: String },
  id_str:    { type: String },
  text:    { type: String },
  retweet_count:    { type: Number },
  screen_name:    { type: String },
  tweet_date:    { type: Date },
  hashtags:    { type: String },
  urls:    { type: String },
  user_mentions:    { type: String }
});

module.exports = mongoose.model('tweets', clientSchema);  