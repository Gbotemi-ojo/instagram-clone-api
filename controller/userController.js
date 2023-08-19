const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const userModel = require("../model/user");
const bcrypt = require("bcryptjs")
exports.sign_up_form_post = [
    body("username", "username name must be minimum of 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("password", "password must be at least 8 characters long")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    body("email","password field is required")
        .trim()
        .isLength({min : 1}),
    body("fullname", "enter your full name to complete registration")
        .trim()
        .isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        try {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                const errors = validationResult(req);
                const sign_up = new userModel({
                    username: req.body.username,
                    fullname :req.body.fullname,
                    password: hashedPassword,
                    email: req.body.email,
                });
                if (!errors.isEmpty()) {
                    res.json({
                        errors : errors.array()
                    })
                    return;
                }
                else {
                    const [email_exists, username_exists] = await Promise.all([
                        userModel.findOne({email:req.body.email}),
                        userModel.findOne({username: req.body.username }),
                    ]);
                    if(email_exists){
                        res.status(403).json("This email already exists");
                        return;
                    }
                    else if(username_exists){
                        res.status(403).json("This username exists,choose another")
                        return;
                    }
                    else{
                        await sign_up.save();
                        res.status(403).json({
                            message : "sign up successful!"
                        })
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }
    })]