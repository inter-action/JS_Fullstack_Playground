import * as Router from 'koa-router'
import * as Boom from 'boom';
import { ApiRoutes } from '../api'
import { AppRoutes } from './app_routes';


export const Routes = {
    api: ApiRoutes,
    app: AppRoutes
}


export function initRoutes(app: any) {
    let root = new Router()
    root.use(Routes.api.routes(), Routes.api.allowedMethods());
    root.use(Routes.app.routes(), Routes.app.allowedMethods());

    app
        .use(root.routes())
        .use(root.allowedMethods({
            throw: true,
            notImplemented: () => Boom.notImplemented(),
            methodNotAllowed: () => Boom.methodNotAllowed()
        }));

}