const nodeMailer = require("../../config/nodemailer");

// another way of exporting a method
exports.newComment = (comment) => {
  //   console.log("inside new comment mailer");
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "123@gmail.com",
      to: comment.user.email,
      subject: "New Comment Publish",
      html: htmlString,
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
