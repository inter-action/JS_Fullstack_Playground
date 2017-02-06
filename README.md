# ABOUT THIS REPO
this project serves a playground for me to experiment JavaScript fullstack techniques.

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


other low priorities checkpoints:
* JWT & Outh2
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
make run
```


# notes
* this repo includes my vscode editor settings, which may not be what u like, also note that in case 
you're surprised by some wired stuff, assume you're using vscode ofc, I suggest u take look at it.

# compatiblitiy
* node > 4.x ,  typescript async support requires it


# decisions
* reactjs vs angular2:
    I initially planed to use react eco libs as front-end bricks to build univeral app. Then I thought
    I have learned/exercised enough from my daily work. I want to understand & learn why the angular2 team
    made the choices they made. And it has more chanllenge.


# Issues:

* when test related to db failed, and it reports db table missing. you need to create your tables specified in the 
migration folder by run `knex migrate:latest --env test --knexfile  <your project absolute path>build/server/data/db/knexfile.js`,
if it fails, delete your tables in your testdb first.

# Credits
* [Michael Herman's blog](http://mherman.org/)


#References:

* [Chai](http://chaijs.com/api/bdd/)
* [Blue Bird API](http://bluebirdjs.com/docs/api-reference.html)
* [pino api](https://github.com/pinojs/pino/blob/master/docs/API.md#error)
* [KoaJS examples](https://github.com/koajs/examples)