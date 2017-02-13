if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
require('./config');

import * as http from 'http'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import { logger } from './logging'
import { Constants } from './utils'
import { createErrMiddleware } from './middleware'
import routes from './routes'


const koa = new Koa()

koa.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
})
    .use(createErrMiddleware())
    .use(bodyParser({ jsonLimit: '1kb' }))
    .use(routes.routes())

// handle uncaught error. replace console with logger 
koa.on('error', function (error: any) {
    // skip logging HttpError all together
    // todo: find a better way to discriminate HttpError
    if (error.__proto__.status != null || error.status) {
        return;
    }
    // if (error.isBoom) {
    //     error.expose = true; // skip default koa error handling
    //     return;
    // }
    logger.error(error, 'server error');
});

// gracefully exit or handle error here
process.on('uncaughtException', (err) => {
    logger.error(err, 'fatal err occurred, ready to shutdown');
    process.exit(1);
});

// app.listen(9000);
const server = http.createServer(koa.callback()).listen(Constants.APP_PORT)
logger.info(`server started at localhost:${Constants.APP_PORT}, with Env: ${process.env.NODE_ENV}`)
export { koa, server };