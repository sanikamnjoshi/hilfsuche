 ;

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNr: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscribe: {
        type: Boolean
    }
});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);