const express = require('express');

const homeController = require('../controllers/home_controller');

const aboutController = require('../controllers/about_controller');
// for diving the router we need this
const router = express.Router();

console.log("Router loaded");

router.get('/',homeController.home);

router.get('/about',aboutController.about);



module.exports = router;