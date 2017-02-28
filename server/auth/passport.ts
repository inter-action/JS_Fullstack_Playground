
const passport = require('koa-passport');
const {Strategy} = require('passport-local')
const GitHubStrategy = require('passport-github2').Strategy;

import { User, DBUser } from '../model';
import { errors, uid, ENV_UTILS } from '../utils';
import { logger } from '../logging'

// any error would propagate with `next(error)` call
// these two function is current used by passport session strategy
// also could be used by other strategies.
passport.serializeUser((user, done) => {
    done(null, user.uuid)
})

passport.deserializeUser(async (uuid, done) => {
    try {
        const model = await User.findOnePr({ uuid }, { require: true })
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
    usernameField: 'email',
    passwordField: 'password',
    // passReqToCallback: true,
}, async (/*req,*/ email, password, done) => {
    // const ctx = req.ctx;
    try {
        if (!email || !password) {
            return done(new errors.ValidationError('invalid request'));
        }
        let user = await User.loginPr(email, password)

        if (!user) {
            return done(new errors.AppError('invalid username or password', 401))
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err)
    }
}))



let GITHUB_CLIENT_ID = ENV_UTILS.getEnvConfig('OAUTH_GITHUB_CLIENT_ID', false);
let GITHUB_CLIENT_SECRET = ENV_UTILS.getEnvConfig('OAUTH_GITHUB_CLIENT_SECREAT', false)

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    // Use the GitHubStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and GitHub
    //   profile), and invoke a callback with a user object.
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:9000/auth/github/callback'
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = { from: 'github', from_id: profile.id, username: profile.username } as DBUser
                let dbUser = await User.findOnePr({ from: user.from, from_id: user.from_id });
                if (!dbUser) {
                    // create a dummy email for simplicity
                    user.email = user.username + '@github.com'
                    user.password = uid(10)
                    dbUser = await User.addPr(user)
                }
                done(null, dbUser.toJSON())
            } catch (e) {
                done(e)
            }
        }
    ));
} else {
    logger.warn('OAUTH configuration: GitHub missing');
}

