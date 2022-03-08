const Post = require("../models/post");
const User = require("../models/user");

// find the all collections from the post database.
module.exports.home = function (req, res) {
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
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users: users,
        });
      });
      // find all the document from post collection.
      //   return res.render("home", {
      //     title: "SocialWeb | Home",
      //     posts: posts,
      //   });
    });
};
