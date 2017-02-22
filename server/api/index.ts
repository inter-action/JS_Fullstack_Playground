import * as Router from 'koa-router'
import * as koaPassport from 'koa-passport';

import { User, validateUserView } from '../model';
import { tv_show } from './tv_show';
import { AuthMiddlewares } from '../middleware';


export const ApiRoutes = new Router({ prefix: '/api' })
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
    // return a bearer token for auth. using username & password
    .post('/auth', koaPassport.authenticate('local', { session: false }), async (ctx) => {
        let token = await User.createTokenPr(ctx.req.user);
        ctx.body = { data: token }
    })
    // pass on a valid bearer token
    .get('/test_auth', AuthMiddlewares.ensureBearerToken, async ctx => {
        ctx.status = 200;
        ctx.body = 'hey you reached me';
    })
    .get('/', (ctx) => {
        ctx.body = 'Hello api';
    })



ApiRoutes.use(tv_show.routes(), tv_show.allowedMethods());
