const { verify } = require('jsonwebtoken');
import * as BlueBird from 'bluebird';

import { getAuthToken, ENV_UTILS } from '../utils'
import { User } from '../data/model'

const promiseVerify: any = BlueBird.promisify(verify);

export async function ensureUser(ctx, next) {
    let uid = null;
    if (ctx.session && ctx.session.passport && ctx.session.passport.user) {
        uid = ctx.session.passport.user
    } else {
        const token = getAuthToken(ctx)

        if (!token) {
            return ctx.throw(401)
        }

        let decoded: any = null
        try {
            decoded = await promiseVerify(token, ENV_UTILS.getEnvConfig().JWT_SIGNED_TOKEN);
        } catch (err) {
            return ctx.throw(401)
        }
        uid = decoded.id;
    }

    if (uid == null) {
        return ctx.throw(401);
    }

    ctx.state.user = await User.findOnePr({ id: uid })
    // bookshelf always return a result, otherwise a Model.NotFoundError is thrown
    // if (!ctx.state.user) {
    //     ctx.throw(401)
    // }

    return next()
}
