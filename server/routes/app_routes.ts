import * as Router from 'koa-router'


export const AppRoutes = new Router()

AppRoutes.get('/', (ctx) => {
    ctx.body = 'Hello Koa';
})
