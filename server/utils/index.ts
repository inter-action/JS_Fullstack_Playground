import * as paths from './paths'
import * as Constants from './constants'
import * as errors from './errors';

export * from './env'
export * from './io';
export * from './validator'

export { Constants, paths, errors }

/*
return `authorization: Bearer <token>` if found otherwise null
*/
export function getAuthToken(ctx) {
    const header = ctx.request.header.authorization
    if (!header) {
        return null
    }
    const parts = header.split(' ')
    if (parts.length !== 2) {
        return null
    }
    const scheme = parts[0]
    const token = parts[1]
    if (/^Bearer$/i.test(scheme)) {
        return token
    }
    return null
}
