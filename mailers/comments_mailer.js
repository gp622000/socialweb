const nodeMailer = require("../config/nodemailer");

// another way of exporting a method
exports.newComment = (comment) => {
  console.log("inside new comment mailer");
  nodeMailer.transporter.sendMail(
    {
      from: "gyanprakash3434@gmail.com",
      to: comment.user.email,
      subject: "New Comment Publish",
      html: "<h1>Yup, your comment is now published</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
