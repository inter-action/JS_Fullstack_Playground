
const passport = require('koa-passport');
const {Strategy} = require('passport-local')

import { User } from '../model';
import { errors } from '../utils';

// any error would propagate with `next(error)` call
// these two function is current used by passport session strategy
// also could be used by other strategies.
passport.serializeUser((user, done) => {
    done(null, user.uuid)
})

passport.deserializeUser(async (uuid, done) => {
    try {
        const model = await User.findOnePr({ uuid })
        done(null, model.toJSON());
    } catch (err) {
        done(err)
    }
})
// passport can paired with session, if auth success, a `passport.user` field would add to 
// session object which is the result of serializeUser

// passport-core include a session strategy which get deserialized user from session's `passport.user`
// via deserializeUser method
passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    // passReqToCallback: true,
}, async (/*req,*/ username, password, done) => {
    // const ctx = req.ctx;
    try {
        if (!username || !password) {
            return done(new errors.ValidationError('invalid request'));
        }
        let user = await User.loginPr(username, password)

        if (!user) {
            return done(new errors.AppError('invalid username or password', 401))
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err)
    }
}))
