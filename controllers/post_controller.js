const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      // we put user in the local when we authenticate using passport js
      // which we will find in the passport-local-authentication setAuthenticated User.
      user: req.user._id,
    },
    function (err, Post) {
      if (err) {
        console.log("Error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // .id means converting tthe object id into string
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
