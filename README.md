# ABOUT THIS REPO
this project serves a playground for me to experiment JavaScript fullstack techniques.

### keywords:
koa2, node, ava, chai, bookshelf, knex, typescript

## main checkpoints I planed to implement:
dev:
* typescript ✓
* koajs@2.0 ✓
    * template rendering
* logging ✓
* mysql with knex ✓
* orm with bookshelf
* unit test all the way ✓
* functional test (some) ✓
* docker all the way (from dev to production)
* redis cache
* angular2 (move it to delicated github repo or submoudle ?)
* i18n
* travis ci
* email sending service ✓

production checkpoints:
* health checking point
* load balancing with docker
* cloud deployment
* error notification via emails
* nodejs memory dump
* online monitor
* https

security:
* rate limit
* all cookie are http only (secure cookie?)
* specific endpoint spam prevention



other low priorities checkpoints:
* Auth:
    * register
    * Auth ✓
    * forget password
    * activate account
    * deactivate account
* JWT ✓
* Outh2
* Sketch design

all the notes in this process would reside in docs/ directory.


# start

dev:
```shell
npm install
make tscw
#open a new tab
make readlog
#open a new tab

make db_migration
make run
```

# common make rules

```shell
#debug
make run-debug
```

# coding convention
* import order: node, npm package, local lib
* all function returns a Promise and can't easily be typed with typescript, its name ends with `Pr` suffix.
* do not use console.log on prod code base, otherwise pino logger may not be able to format log output.


# notes
* this repo includes my vscode editor settings, which may not be what u like, also note that in case 
you're surprised by some wired stuff, assume you're using vscode ofc, I suggest u take look at it.

* dotenv:
    > .env file was add to faciliate config, even though [dot env doc](https://www.npmjs.com/package/dotenv) discourages the practice of including .env file into git version control. the consideration is this: i need .env file to config my dev
    settings. The actual prod config would be made inside docker config file.(I'll stick to this strategy until the facts hit me otherwise.)


# compatiblitiy
* node > 4.x ,  typescript async support requires it


# decisions
...

# Issues:

* when test related to db failed, and it reports db table missing. you need to create your tables specified in the 
migration folder by run `make db_migration`,
if it fails, delete your tables in your testdb first.


*  error TS2428: All declarations of 'WeakMap' must have identical type parameters.
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14324



# Credits
* [Ghost](https://github.com/TryGhost/Ghost)
* [Michael Herman's blog](http://mherman.org/)
* [koa2-api-boilerplate](https://github.com/adrianObel/koa2-api-boilerplate)

#References:

* [npm io](https://npms.io/)
* [http code reference](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* [Chai](http://chaijs.com/api/bdd/)
* [Blue Bird API](http://bluebirdjs.com/docs/api-reference.html)
* [pino api](https://github.com/pinojs/pino/blob/master/docs/API.md#error)
* [KoaJS examples](https://github.com/koajs/examples)
* [Boom API](https://github.com/hapijs/boom)
* [validatorjs](https://github.com/chriso/validator.js)