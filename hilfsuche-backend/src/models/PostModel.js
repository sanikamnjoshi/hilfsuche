const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  title: {
    type: String
  },
  location: {
    type: Array
  },
  locationName: {
    type: String
  },
  category: {
    type: String
  },
  content: {
    type: String
  },
  isFullfilled: {
    type: Boolean
  },
  isGiver: {
    type: Boolean
  },
  creatorUserId: {
    type: String
  }
});

module.exports = mongoose.model('Post', Post);