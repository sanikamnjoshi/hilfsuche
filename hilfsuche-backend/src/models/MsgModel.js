const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Msg = new Schema({
    fromUserId: {
        type: String
    },
    toUserId: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Msg', Msg);