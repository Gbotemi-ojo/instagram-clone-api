const userController = require("../controller/userController");
const feedpostController = require("../controller/feedpostController");
const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../config/passport');
router.get("/", (req, res) => {
    res.json("this is home")
});
router.post("/instagram-clone/signup",userController.sign_up);
router.post("/instagram-clone/signin",userController.sign_in);
router.get("/instagram-clone",passport.authenticate('jwt', { session: false }),feedpostController.feedpost);
module.exports = router;