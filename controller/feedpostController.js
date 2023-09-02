const asyncHandler = require("express-async-handler");
// feed post is the initial homepage
exports.feedpost = [
    asyncHandler(async (req, res, next) => {
        return res.status(200).json({
        
            user: {
                id: req.user._id,
                username: req.user.username,
                data : 'feedpost data here'
            }
        })
    })
]