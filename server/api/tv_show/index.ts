import * as Router from 'koa-router'
import * as TvShow from '../../data/model/tv_show'

const tv_show = new Router()

tv_show
    .get('/', async (ctx, next) => {// next is not needed. but for demo purpose i leave it here
        try {
            const shows = await TvShow.getAll()
            ctx.body = shows
            return await next() // this line is not necessary
        } catch (ex) {
            ctx.throw(404, ex.message)
        }
    })

export { tv_show }
