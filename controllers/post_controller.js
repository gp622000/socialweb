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
    function (err, post) {
      if (err) {
        req.flash("error", err);
        return;
      }
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post: post,
          },
          message: "Post created",
        });
      }
      req.flash("success", "Post published");
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
        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id,
            },
            message: "Post deleted",
          });
        }
        req.flash("success", "Post and associated comments deleted");
        return res.redirect("back");
      });
    } else {
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
  });
};
