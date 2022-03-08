//calling the express
const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
//used for store the session cookie on the mongo store.
const MongoStore = require("connect-mongo");

const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use express router

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db.
app.use(
  session({
    name: "sociaWeb",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/socialweb_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect-mongodb setup ok");
      }
    ),
  })
);

// when the app is getting initialize passport is also getting initalize
app.use(passport.initialize());
app.use(passport.session());

// whenever this function is being called when this function is called it checks the session cookie is present or not
// if its authenticated then it will set user in the locals
// it will call as a middleware when any request comes it will pass to this.
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes/index"));

// `` is called backtic
// this process is known as interpolation.
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  //console.log("Server is running at port: ",port) same as below;
  console.log(`Server is running on port: ${port}`);
});
