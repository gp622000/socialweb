const mongoose = require('mongoose');
const User = require('./user');

const commentSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // comment belongs to a user
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    timeStamps : true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;