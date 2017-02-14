#Knex

## 

    # install knex cli
    npm install knex -g


## overview
Knex bundle a cli tool help development. migration and seed are two most outstanding ones.
* migration: create schema inside target db.
* seed: insert some basic/test data in db.

a demo reside /jssrc/data/db directory



## Tools

### Migration:
how migration cli works: (this is no longer working, after changes made yestoday, try use db_migration rule defined in makefile)

`knex migrate:latest --env test --knexfile  build/server/data/db/knexfile.js`
when you run this in your command line prompt, knex change it's directory to where knex config
file located, that is `build/server/data/db/`
.then knex will try to create your tables specified in you migration folder with two addtional tables,
`knex_migration` & `knex_migration_lock`. this two tables preserve some migration history info. when you try
to rollback you database, knex  would infer out which is last miragtion based on info in these two tables.

    
    # create a empty, migrate file, you need to fill the empty file with codes.
    # what make using knex syntax good is that it's total portable.
    # the api is in the `Schema Builder` section of official doc
    knex migrate:make migration_name --env test --knexfile <knex_configfile>

    # update your db
    knex migrate:latest --env production

    # To rollback the last batch of migrations:
    knex migrate:rollback
    

### seed:

    knex seed:run --env test --knexfile <knex_configfile>
    
    
    
    

http://knexjs.org/#Migrations-CLI

