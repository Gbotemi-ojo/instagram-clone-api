const postModel = require("../model/post");
const postLikeModel = require("../model/postLikes");
const commentLikeModel = require("../model/commentLikes");
const commentModel = require("../model/comments");
const commentReplyLikeModel = require("../model/commentReplyLikes")
const cloudinary = require('../config/cloudinary');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.post = [
    asyncHandler(async (req, res, next) => {
        // const { user, upload, caption, date_posted,likes,comments } = req.body;
        try {
            const errors = validationResult(req);
            const file = await cloudinary.uploader.upload(req.body.upload, {
                folder: "uploads",
            })
            const post = new postModel({
                user: res.locals.currentUser._id,
                caption: req.body.caption,
                date_posted: new Date(),
                upload: {
                    public_id: file.public_id,
                    url: file.secure_url
                }
            });
            if (!errors.isEmpty()) {
                res.json({
                    err: errors.array()
                })
                return;
            }
            else {
                await post.save();
                res.json("comment added")
            }
        } catch (error) {
            console.log(error)
        }
    })];
exports.likePost = [asyncHandler(async (req, res, next) => {
    try {
        const like = new postLikeModel({
            user: res.locals.currentUser._id,
            post: req.body.post_id
            // the id here would be provided in the frontend, most likely through the id
        });
        await like.save();
    } catch (error) {
        console.log(error);
    }
})];

exports.unlikePost = [
    asyncHandler(async (req, res, next) => {
        try {
            await postLikeModel.deleteOne({ post: req.body.post_id, user: res.locals.currentUser._id });
        } catch (error) {
            console.log(error);
        }
    })
]

exports.comment = [
    body("comment", "comment cannot be empty")
        .trim()
        .isLength({ min: 1 }),
    asyncHandler(async (req, res, next) => {
        try {
            const errors = validationResult(req);
            const comment = new commentModel({
                post: req.body.post_id,
                comment: req.body.comment,
                date_posted: new Date()
                // the id here would be provided in the frontend, most likely through the id
            });
            if (!errors.isEmpty()) {
                res.json({
                    err: errors.array()
                })
                return;
            }
            await comment.save();
            res.json("comment added")
        } catch (error) {
            console.log(error);
        }
    })];

exports.deleteComment = [
    asyncHandler(async (req, res, next) => {
        try {
            await commentModel.deleteOne({ comment: req.body.comment_id, user: res.locals.currentUser._id });
        } catch (error) {
            console.log(error);
        }
    })
]

exports.commentLike = [
    asyncHandler(async (req, res, next) => {
        try {
            const like = new commentLikeModel({
                user: res.locals.currentUser._id,
                comment: req.body.comment_id
                // the id here would be provided in the frontend, most likely through the id
            });
            await like.save();
        } catch (error) {
            console.log(error);
        }
    })
]
exports.commentUnlike = [
    asyncHandler(async (req, res, next) => {
        try {
            await commentLikeModel.deleteOne({ comment: req.body.comment_id, user: res.locals.currentUser._id });
        } catch (error) {
            console.log(error);
        }
    })
]

exports.commentReply = [
    body("commentReply", "comment cannot be empty")
        .trim()
        .isLength({ min: 1 }),
    asyncHandler(async (req, res, next) => {
        try {
            const errors = validationResult(req);
            const comment = new commentModel({
                post: req.body.post_id,
                comment: req.body.commentReply,
                date_posted: new Date()
                // the id here would be provided in the frontend, most likely through the id
            });
            if (!errors.isEmpty()) {
                res.json({
                    err: errors.array()
                })
                return;
            }
            await comment.save();
            res.json("comment added");
        } catch (error) {
            console.log(error);
        }
    })
]

exports.commentReplyLike = [
    asyncHandler(async (req, res, next) => {
        try {
            const like = new commentReplyLikeModel({
                user: res.locals.currentUser._id,
                comment: req.body.commentReply_id
            });
            await like.save();
        } catch (error) {
            console.log(error);
        }
    })
]

exports.commentReplyUnlike = [
    asyncHandler(async (req, res, next) => {
        try {
            await commentReplyLikeModel.deleteOne({ comment: req.body.commentReply_id, user: res.locals.currentUser._id });
        } catch (error) {
            console.log(error);
        }
    })
]

exports.deleteCommentReply = []
