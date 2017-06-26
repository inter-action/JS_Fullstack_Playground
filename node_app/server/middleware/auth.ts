const { verify } = require("jsonwebtoken");
import * as BlueBird from "bluebird";
import * as Router from "koa-router";

import { getAuthBearerToken, ENV_UTILS } from "../utils"
import { getUserAccess } from "../entities"

const promiseVerify: any = BlueBird.promisify(verify);

type Next = () => Promise<any>

export async function ensureBearerToken(ctx: Router.IRouterContext, next: Next) {
    let uuid = null;
    const token = getAuthBearerToken(ctx)

    if (!token) {
        return ctx.throw(401)
    }

    let decoded: any = null
    try {
        decoded = await promiseVerify(token, ENV_UTILS.getEnvConfig("JWT_SIGNED_TOKEN"));
    } catch (err) {
        return ctx.throw(401)
    }
    uuid = decoded.uuid;

    if (uuid == null) {
        return ctx.throw(401);
    }

    let user = await getUserAccess().findOne({ uuid: uuid });
    if (!user) {
        return ctx.throw(401, "invalid token")
    }
    ctx.state.user = user;
    return next()
}

// used for app router
export async function ensureUser(ctx: Router.IRouterContext, next: Next) {
    if (ctx.isUnauthenticated()) {
        return ctx.throw(401);
    }
    next()
}