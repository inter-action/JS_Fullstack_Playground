import * as Koa from 'koa'
import * as http from 'http'
import * as bodyParser from 'koa-bodyparser'

import { logger } from './logging'
import { Constants } from './utils'
import routes from './routes'

const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
})
    .use(bodyParser({ jsonLimit: '54kb' }))
    .use(routes.routes())


// handle uncaught error. replace console with logger 
app.on('error', function (err: any) {
    logger.error('server error', err);
});

// gracefully exit or handle error here
process.on('uncaughtException', logger.error);

// app.listen(9000);
const server = http.createServer(app.callback()).listen(Constants.APP_PORT)
logger.info(`server started at localhost:${Constants.APP_PORT}`)
export { app, server };