import * as Router from 'koa-router'


export const AppRoutes = new Router()

AppRoutes.get('/', async (ctx) => {
    await ctx.render('index', { msg: { hello: 'hello koa2!👍' } })
})
