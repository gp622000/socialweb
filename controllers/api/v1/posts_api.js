const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // .id means converting tthe object id into string
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        // if (req.xhr) {
        //   return res.status(200).json({
        //     data: {
        //       post_id: req.params.id,
        //     },
        //     message: "Post deleted",
        //   });
        // }
        // req.flash("success", "Post and associated comments deleted");
        return res.json(200, {
          message: "Post and associated comments deleted successfully",
        });
        // return res.redirect("back");
      });
    } else {
      return res.json(400, {
        message: "You cannot delete this post",
      });
      return res.redirect("back");
    }
  });
};
