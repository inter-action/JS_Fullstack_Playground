import * as Router from 'koa-router'
import * as koaPassport from 'koa-passport';

import { User, validateUserView } from '../data/model';
import { tv_show } from './tv_show';
import { ensureUser } from '../middleware';

const localAuth: any = koaPassport.authenticate('local')
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
    .post('/auth', localAuth, async (ctx) => {
        let uuid = ctx.session.passport.user
        let model = await User.findOnePr({ uuid });
        let token = await User.createTokenPr(model.attributes);
        ctx.body = { data: token }
    })
    .post('/logout', localAuth, async ctx => {
        ctx.logout();
        ctx.status = 200;
    })
    .get('/test_auth', ensureUser, async ctx => {
        ctx.status = 200;
        ctx.body = 'hey you reached me';
    })


ApiRoutes.use('/tv_shows', tv_show.routes(), tv_show.allowedMethods());

export default ApiRoutes