const Post = require('../models/post');
// find the all collections from the post database.
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // console.log(req.user_id);
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     // find all the document from post collection.
    //     return res.render('home',{
    //         title:"SocialWeb | Home",
    //         posts : posts
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        // find all the document from post collection.
        return res.render('home',{
            title:"SocialWeb | Home",
            posts : posts
        });
    });
    
}