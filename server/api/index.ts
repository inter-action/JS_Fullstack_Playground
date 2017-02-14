import * as Router from 'koa-router'
import * as koaPassport from 'koa-passport';

import { User, validateUserView } from '../data/model';
import { tv_show } from './tv_show';
import { ensureUser } from '../middleware';

let ApiRoutes = new Router()
    .post('/register', async (ctx) => {
        const body = ctx.request.body;
        let error = validateUserView(body)
        if (error) {
            throw error;
        }
        const hash = await User.createHashPr(body.password);
        body.password = hash;
        await new User(body).save(body);
        ctx.status = 200;
    })
    .post('/auth', koaPassport.authenticate('local') as any, async (ctx) => {
        let uid = ctx.session.passport.user
        let model = await User.findOnePr({ id: uid });
        let token = await User.createTokenPr(model.attributes);
        debugger
        ctx.body = { data: token }
    })
    .post('/logout', koaPassport.authenticate('local') as any, async ctx => {
        debugger
        console.log(ctx.session)
        console.log(ctx.session.passport)
        if (!ctx.session.passport.user) {
            ctx.body = 'already logout'
        } else {
            ctx.logout();
            ctx.body = 'ok'
        }
    })
    .get('/test_auth', ensureUser, async ctx => {
        ctx.status = 200;
        ctx.body = 'hey you reached me';
    })


ApiRoutes.use('/tv_shows', tv_show.routes(), tv_show.allowedMethods());

export default ApiRoutes