
const passport = require('koa-passport');
const {Strategy} = require('passport-local')

import { User } from '../data/model';
import { errors } from '../utils';

// any error would propagate with `next(error)` call
// these two function is current used by passport session strategy
// also could be used by other strategies.
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const model = await User.findOnePr({ id })
        done(null, model.attributes);
    } catch (err) {
        done(err)
    }
})

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
