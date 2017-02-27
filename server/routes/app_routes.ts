import * as Router from 'koa-router';
import * as boom from 'boom';
import * as validator from 'validator';
const passport = require('koa-passport');
import * as _ from 'lodash';

import { User } from '../model';
import { Constants, decodeBase64URLsafe, encodeBase64URLsafe } from '../utils';
import { mailgun } from '../mailsender'

export const appRouts = new Router()

appRouts.get('/logout', async ctx => {
    ctx.logout();
    ctx.redirect('/')
});

appRouts.get('/login', async (ctx) => {
    await ctx.render('login')
})

appRouts.post('/login', async (ctx, next) => {
    let nuser = null;
    await passport.authenticate('local', (user) => {
        nuser = user;
    })(ctx, next);
    if (nuser) {
        ctx.logIn(nuser, (error) => {
            if (error) throw error;
            else ctx.redirect('/')
        })
    } else {
        await ctx.render('error', { msg: 'incorrect username or password' });
    }
})


appRouts.get('/forget-password', async (ctx, next) => {
    await ctx.render('forget_password');
});

appRouts.post('/forget-password', async (ctx, next) => {
    let body = ctx.request.body;
    if (!(_.isString(body.email) && validator.isEmail(body.email))) {
        throw boom.badData('email is required');
    }

    let [error, token] = await User.generateResetToken(Date.now() + Constants.TIME.ONE_DAY_MILI_SEC, body.email);
    if (error) throw error
    else {
        let html = await mailgun.loadTplPr('reset_password.ejs', { resetUrl: `http://localhost:9000/reset-password?token=${encodeBase64URLsafe(token)}` });
        await mailgun.sendmail({ to: body.email, subject: 'reset password', html })
        ctx.status = 200;
    }
});


appRouts.get('/reset-password', async (ctx, next) => {
    let query = ctx.request.query;
    if (!query.token) {
        throw boom.badData('token is required');
    }

    await ctx.render('reset_password', { token: query.token });
})

appRouts.post('/reset-password', async (ctx, next) => {
    let body = ctx.request.body;
    if (body.token == null || validator.isEmpty(body.token)) {
        throw boom.badData()
    }

    // should also check password length
    if (
        !body.password ||
        !body.repeatPassword ||
        validator.isEmpty(body.password) ||
        validator.isEmpty(body.repeatPassword) ||
        body.password !== body.repeatPassword) {

        throw boom.badData()
    }

    let [error, user] = await User.validateResetTokenPr(decodeBase64URLsafe(body.token));
    if (error) throw error;
    else {
        let usermodel = await User.findOnePr({ email: user.email }, { require: true });
        let pwhash = await User.createHashPr(body.password);
        usermodel.set('password', pwhash);
        usermodel = await usermodel.save();
        if (ctx.isUnauthenticated()) {
            ctx.logout()
        }
        ctx.logIn(usermodel.toJSON(), (error) => {
            if (error) throw error;
            else ctx.redirect('/')
        })
    }
})


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
appRouts.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
appRouts.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' }));

// has to be put in the last. Otherwise this route would get matched before others
appRouts.get('/', async (ctx) => {
    let option: any = {}
    if (ctx.req.user) {
        option.user = ctx.req.user
    }
    await ctx.render('index', option);
})
