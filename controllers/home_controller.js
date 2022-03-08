const Post = require("../models/post");
const User = require("../models/user");

// find the all collections from the post database.
module.exports.home = async function (req, res) {
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
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});
    return res.render("home", {
      title: "SocialWeb | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
  // find all the document from post collection.
};
