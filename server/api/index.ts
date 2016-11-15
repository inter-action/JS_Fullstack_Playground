import * as Router from 'koa-router'
import { tv_show } from './tv_show'

let ApiRoutes = new Router()

ApiRoutes.use('/tv_shows', tv_show.routes(), tv_show.allowedMethods());

export default ApiRoutes