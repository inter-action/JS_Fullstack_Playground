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
    .post('/', async (ctx, next) => {
        const id = await TvShow.save(ctx.request.body)
        ctx.body = await TvShow.getSingle(id)
    })
    .get('/:id', async (ctx, next) => {
        const id = parseInt(ctx.params.id) // validate id
        ctx.body = await TvShow.getSingle(id)
    })
    .put('/:id', async (ctx, next) => {
        ctx.assert(!ctx.request.body.hasOwnProperty('id'), 422)
        const id = parseInt(ctx.params.id)
        await TvShow.update(id, ctx.request.body)
        const result = await TvShow.getSingle(id)
        ctx.body = Object.assign({}, result)// for some reason, directly set ctx.body will cause circular ref error
    })
    .del('/:id', async (ctx, next) => {
        const id = parseInt(ctx.params.id)
        const item = await TvShow.getSingle(id)
        const rows = await TvShow.del(id)
        ctx.assert(rows !== 0, 404)
        ctx.body = item
    })

export { tv_show }
