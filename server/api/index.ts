import * as Router from 'koa-router'

import { User, IUser, validateUserView } from '../data/model';
import { tv_show } from './tv_show';
import { errors } from '../utils';
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
    .post('/auth', async (ctx) => {
        const body = ctx.request.body as IUser;
        if (!body.username || !body.password) {
            throw new errors.ValidationError('invalid request');
        }
        let user = await User.loginPr(body.username, body.password)

        if (!user) {
            ctx.status = 401;
            ctx.body = 'invalid username or password';
        } else {
            ctx.body = { data: await User.createTokenPr(user) };
            ctx.status = 200
        }
    })
    .get('/test_auth', ensureUser, async ctx => {
        ctx.status = 200;
        ctx.body = 'hey you reached me';
    })


ApiRoutes.use('/tv_shows', tv_show.routes(), tv_show.allowedMethods());

export default ApiRoutes