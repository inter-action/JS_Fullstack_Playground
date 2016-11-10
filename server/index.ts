import * as Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use((ctx) => {
    ctx.body = 'Hello Koa';
});

app.listen(9000);