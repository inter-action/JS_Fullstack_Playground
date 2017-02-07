import * as Koa from 'koa'
import * as http from 'http'
import * as bodyParser from 'koa-bodyparser'

import { logger } from './logging'
import { Constants, ENV_UTILS } from './utils'
import routes from './routes'

// load dotenv
require('dotenv').config();

const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
})
    .use(bodyParser({ jsonLimit: '1kb' }))
    .use(routes.routes())


// handle uncaught error. replace console with logger 
app.on('error', function (error: any) {
    // skip logging HttpError when running test
    // todo: find a better way to discriminate HttpError
    if (ENV_UTILS.is_test() && error.__proto__.status != null) {
        return;
    }
    logger.error(error, 'server error');
});

// gracefully exit or handle error here
process.on('uncaughtException', logger.error);

// app.listen(9000);
const server = http.createServer(app.callback()).listen(Constants.APP_PORT)
logger.info(`server started at localhost:${Constants.APP_PORT}`)
export { app, server };