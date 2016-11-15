import * as Router from 'koa-router'
import ApiRoutes from '../api'

let RootRoutes = new Router()

RootRoutes.get('/', (ctx) => {
    ctx.body = 'Hello Koa';
})

RootRoutes.use('/api', ApiRoutes.routes(), ApiRoutes.allowedMethods());

export default RootRoutes