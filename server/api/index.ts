import * as Bluebird from 'bluebird';
import * as Router from 'koa-router'
import { tv_show } from './tv_show'

const bcrypt = require('bcrypt');
const saltRounds = 10;
const bcrypt_create_hash: any = Bluebird.promisify(bcrypt.hash);
const bcrypt_compare: any = Bluebird.promisify(bcrypt.compare);
let ghash = '';

let ApiRoutes = new Router()
    .post('/register', async (ctx) => {
        const request_body = ctx.request.body;
        const hash = await bcrypt_create_hash(request_body.password, saltRounds);
        ghash = hash
        ctx.body = `${ghash}, ${request_body.password}`
    })
    .post('/login', async (ctx) => {
        const request_body = ctx.request.body;
        const is_password_valid = await bcrypt_compare(request_body.password, ghash);
        ctx.body = `${is_password_valid}, ${request_body.password}`
    })


ApiRoutes.use('/tv_shows', tv_show.routes(), tv_show.allowedMethods());

export default ApiRoutes