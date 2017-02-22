import * as Router from 'koa-router'
import * as TvShow from '../../model/tv_show'

export const tv_show = new Router({ prefix: '/tv_shows' })

tv_show
    .get('/', async (ctx) => {
        try {
            const shows = await TvShow.getAll()
            ctx.body = shows
        } catch (ex) {
            ctx.throw(404, ex.message)
        }
    })
    .post('/', async (ctx) => {
        const id = await TvShow.save(ctx.request.body)
        ctx.body = await TvShow.getSingle(id)
    })
    .get('/:id', async (ctx) => {
        const id = parseInt(ctx.params.id) // validate id
        ctx.body = await TvShow.getSingle(id)
    })
    .put('/:id', async (ctx) => {
        ctx.assert(!ctx.request.body.hasOwnProperty('id'), 422)
        const id = parseInt(ctx.params.id)
        await TvShow.update(id, ctx.request.body)
        const result = await TvShow.getSingle(id)
        ctx.body = Object.assign({}, result)// for some reason, directly set ctx.body will cause circular ref error
    })
    .del('/:id', async (ctx) => {
        const id = parseInt(ctx.params.id)
        const item = await TvShow.getSingle(id)
        const rows = await TvShow.del(id)
        ctx.assert(rows !== 0, 404)
        ctx.body = item
    })

