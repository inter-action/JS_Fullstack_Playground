import * as Koa from 'koa'
import * as http from 'http'
import * as bodyParser from 'koa-bodyparser'

// load dotenv
let result = require('dotenv').config();
if (result.error) {
    throw result.error
}

import { logger } from './logging'
import { Constants } from './utils'
import routes from './routes'



const koa = new Koa()

koa.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
}).use(async (ctx, next) => { // boom error handler middleware
    try {
        await next();
    } catch (e) {
        if (e.isBoom) {
            let output = e.output;
            ctx.status = output.statusCode;
            Reflect.ownKeys(output.headers).forEach(k => {
                ctx.response.set(k as string, output.headers[k]);
            });
            ctx.body = output.payload;
        } else {
            throw e;
        }
    }
})
    .use(bodyParser({ jsonLimit: '1kb' }))
    .use(routes.routes())

// handle uncaught error. replace console with logger 
koa.on('error', function (error: any) {
    // skip logging HttpError all together
    // todo: find a better way to discriminate HttpError
    if (error.__proto__.status != null) {
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
logger.info(`server started at localhost:${Constants.APP_PORT}`)
export { koa, server };