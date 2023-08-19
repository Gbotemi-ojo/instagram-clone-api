const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/signup",userController.sign_up);
router.post("/signin",userController.sign_in)
module.exports = router;