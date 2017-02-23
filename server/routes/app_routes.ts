import * as Router from 'koa-router'
const passport = require('koa-passport');

export const AppRoutes = new Router()

AppRoutes.get('/logout', async ctx => {
    ctx.logout();
    ctx.redirect('/')
});

AppRoutes.get('/login', async (ctx) => {
    await ctx.render('login')
})

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
AppRoutes.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
AppRoutes.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' }));

// has to be put in the last. Otherwise this route would get matched before others
AppRoutes.get('/', async (ctx) => {
    let option: any = {}
    if (ctx.req.user) {
        option.user = ctx.req.user
    }
    await ctx.render('index', option);
})
