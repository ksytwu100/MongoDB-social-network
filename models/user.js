const mongoose = require('mongoose');
const Thought = require('./Thought');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Thought
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
const User = mongoose.model('User', userSchema);

module.exports = User;

