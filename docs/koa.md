# KoaJS
* [koa guide](https://github.com/koajs/koa/blob/v2.x/docs/guide.md)


## unfamilar stuff
* app.keys=
    this set keys for create signed/encryped cookies.
* ctx.throw([msg], [status], [properties]) / ctx.assert(value, [status], [msg], [properties])
* compose koa middleware using `koa-compose`


## tech stack:

```plain
koa-router

bodyparser: 
    repo
        https://github.com/koajs/bodyparser
    examples:
        // read request body
        ctx.request.body


```


* session:
https://github.com/koajs/generic-session

    npm install --save koa-convert koa-generic-session
    ```
    const convert = require('koa-convert') // necessary until koa-generic-session has been updated to support koa@2
    const session = require('koa-generic-session')
    ```

## auth: passport, JWT
    require session support.

    ```
    npm install --save passport-local koa-passport@next  

    ```

### JWT
jwt is data encoded a single token make up with 3 major parts. It ensure data's integrity, 
the 3rd signed hash make it hard to temper the data it contains.

jwt: 
* [JWT introduction](https://jwt.io/introduction/)
* [understanding jwt](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.h2lcdtlr2)



## notes

* always return something in your endpoint either by:
    * throw error
    * set ctx.body
    * set ctx.status


## RESTful api:

* [post vs create](http://stackoverflow.com/questions/630453/put-vs-post-in-rest)




# Links
* [kick-off-koa, An intro to koa via a set of self-guided workshops](https://github.com/koajs/kick-off-koa)
* [Building A Server-Side Application With Async Functions and Koa 2](https://www.smashingmagazine.com/2016/08/getting-started-koa-2-async-functions/)
* [Koa.js Tutorial](https://www.tutorialspoint.com/koajs/index.htm)
* ![koa examples](https://github.com/koajs/examples)