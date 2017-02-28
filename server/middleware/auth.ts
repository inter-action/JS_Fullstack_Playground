const { verify } = require('jsonwebtoken');
import * as BlueBird from 'bluebird';
import * as Router from 'koa-router';

import { getAuthBearerToken, ENV_UTILS } from '../utils'
import { User } from '../model'

const promiseVerify: any = BlueBird.promisify(verify);

type Next = () => Promise<any>

export async function ensureBearerToken(ctx: Router.IRouterContext, next: Next) {
    let uid = null;
    const token = getAuthBearerToken(ctx)

    if (!token) {
        return ctx.throw(401)
    }

    let decoded: any = null
    try {
        decoded = await promiseVerify(token, ENV_UTILS.getEnvConfig('JWT_SIGNED_TOKEN'));
    } catch (err) {
        return ctx.throw(401)
    }
    uid = decoded.id;

    if (uid == null) {
        return ctx.throw(401);
    }

    ctx.state.user = await User.findOnePr({ id: uid }, { require: true })
    return next()
}

// used for app router
export async function ensureUser(ctx: Router.IRouterContext, next: Next) {
    if (ctx.isUnauthenticated()) {
        return ctx.throw(401);
    }
    next()
}