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

    
    # create a migrate file
    knex migrate:make migration_name --knexfile <knex_configfile>

    # update your db
    knex migrate:latest --env production

    # To rollback the last batch of migrations:
    knex migrate:rollback
    
    

http://knexjs.org/#Migrations-CLI

