const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/signup",userController.sign_up_form_post);
module.exports = router;