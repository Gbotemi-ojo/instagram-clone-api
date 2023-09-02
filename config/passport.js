const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UserModel = require("../model/user");
const passport = require('passport');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    let user = await UserModel.findOne({ id: jwt_payload._id });
    if(user){
        return done(null, user);
    }
    else{
        return done(null, false);
    }
    // UserModel.findOne({ id: jwt_payload._id }, function (err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));