const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/').User;
const config = require('../config');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(config.passportHeaderType);
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.data.id)
        .then(user => {
            if(user) return done(null, user);
            else return done(null, false);
        })
        .catch(err => {
            return done(err, false)
        });
    }));
};