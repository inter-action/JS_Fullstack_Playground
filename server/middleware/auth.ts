const { verify } = require('jsonwebtoken');
import * as BlueBird from 'bluebird';

import { getAuthBearerToken, ENV_UTILS } from '../utils'
import { User } from '../model'

const promiseVerify: any = BlueBird.promisify(verify);

export async function ensureBearerToken(ctx, next) {
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
