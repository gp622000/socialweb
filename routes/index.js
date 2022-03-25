const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// for diving the router we need this

console.log("Router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./post"));
router.use("/comments", require("./comments"));
// for any further routes, acccess from here
// router.use('/routerName',require('./routerfile'));

router.use("/api", require("./api"));

module.exports = router;
