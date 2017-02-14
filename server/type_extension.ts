// https://github.com/Microsoft/TypeScript/issues/280
// https://github.com/Microsoft/TypeScript/issues/10859
import * as Koa from 'koa'

declare module 'koa-router' {
    export interface IRouterContext extends Koa.Context {
        session: {
            passport: {
                user: number
            },
        }
    }
}



