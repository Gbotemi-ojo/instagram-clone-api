var express = require('express');
var router = express.Router();
const passport = require("passport");
const feedpostController = require("../controller/feedpostController");
require('../config/passport');
/* GET home page. */
router.get("/", (req, res) => {
    res.json("this is home")
});
router.get("/instagram-clone", passport.authenticate('jwt', { session: false }), feedpostController.feedpost);


module.exports = router;
