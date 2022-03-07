const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // this is written because the post has been posted by some user
    // so we need to refered it to user schema.
    user : {
        // we are refering with the objectId of the user
        type : mongoose.Schema.Types.ObjectId,
        // refering to userSchema from the models
        ref : 'User'
    },
    // include the arrary of ids of al comments in this post schme itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},{
    timestamps : true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;