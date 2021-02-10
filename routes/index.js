const express = require('express');

const homeController = require('../controllers/home_controller');


// for diving the router we need this
const router = express.Router();

console.log("Router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any further routes, acccess from here
// router.use('/routerName',require('./routerfile'));

module.exports = router;