const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const userModel = require("../model/user");
const bcrypt= require("bcryptjs");
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcryptjs');
require('../config/passport');
exports.sign_up = [
    body("username", "username name must be minimum of 4 characters")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body("password", "password must be at least 8 characters long")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    body("email", "email field is required")
        .trim()
        .isLength({ min: 1 }),
    body("fullname", "enter your full name to complete registration")
        .trim()
        .isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        try {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                const errors = validationResult(req);
                const sign_up = new userModel({
                    username: req.body.username,
                    fullname: req.body.fullname,
                    password: hashedPassword,
                    email: req.body.email,
                });
                if (!errors.isEmpty()) {
                    res.status(403).json({
                        error : errors.array()
                    });
                    return;
                }
                else {
                    const [email_exists, username_exists] = await Promise.all([
                        userModel.findOne({ email: req.body.email }),
                        userModel.findOne({ username: req.body.username }),
                    ]);
                    if (email_exists) {
                        res.status(403).json("This email already exists");
                        return;
                    }
                    else if (username_exists) {
                        res.status(403).json("This username exists,choose another")
                        return;
                    }
                    else {
                        await sign_up.save();
                        res.status(201).json({
                            message: "sign up successful!"
                        })
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }
    })]

exports.sign_in = [
    body("username", "username is expected to be 4 characters or more")
        .trim()
        .isLength({ min: 4 }),
    body("password", "password must be at least 8 characters long")
        .trim()
        .isLength({ min: 8 }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                res.status(403).json({
                    error: errors.array()
                });
                return;
            }
            const user = await userModel.findOne({username : req.body.username});
            if(!user ){
                res.status(403).json("This account does not exists")
                return;
            }
            if (!compareSync(req.body.password, user.password)) {
                return res.status(403).json("Incorrect password")
            }
            const payload = {
                username: user.username,
                id: user._id
            }
            const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });
            return res.status(200).json({
                success: true,
                message: "Logged in successfully!",
                token: "Bearer " + token
            })
        } catch (error) {
            console.log(error)
        }
    })]