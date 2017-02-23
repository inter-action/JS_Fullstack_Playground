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
export function getAuthBearerToken(ctx): null | string {
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


/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
export function uid(len: number): string {
    let buf: string[] = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        i;

    for (i = 1; i < len; i = i + 1) {
        let t = chars[getRandomInt(0, charlen - 1)]
        buf.push(t);
    }

    return buf.join('');
}

// return a int in range [from, end], inclusive
function getRandomInt(from: number, end: number): number {
    return Math.floor(Math.random() * ((end + 1) - from)) + from
}
