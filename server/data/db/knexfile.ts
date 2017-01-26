/*
this file is knex config file. the reason for this file not resided inside server folder
is because knex cli creates js file relative to this file. so until i can make sure that
i dont have to work knex cli, this file has to continue staying here.
*/


/*
installation:
  npm install knex -g # get cli
  npm install knex --save-dev  #access from app

usage:
  knex init # create a knexfile.js
  knex migrate:make tv_shows  # create a migration file under ./migrations folder
  knex migrate:latest --env dev  # create dbs inside configured database 
  knex seed:make shows_seed --env dev # generate a .seeds/dev folder, configed inside knexfile.js
  knex seed:run --env dev #run seed file

like:
  knex migrate:latest --env dev --knexfile /Users/interaction/workspace/nodejs/js_fullstack_playground/jssrc/data/db/knexfile.js
  knex seed:run --env dev --knexfile /Users/interaction/workspace/nodejs/js_fullstack_playground/jssrc/data/db/knexfile.js
*/

import { ENV } from '../../utils'

// Update with your config settings.

module.exports = {

    // development: {
    //   client: 'sqlite3',
    //   connection: {
    //     filename: './blob/db/dev.sqlite3'
    //   }
    // },

    [ENV.dev]: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'jkliop',
            database: 'myapp_dev'
        },
        pool: {
            min: 2,
            max: 10
        },
        seeds: {// determine where automatically generated go & from where seed file will be run
            directory: './seeds/' + ENV.dev
        }
    },

    [ENV.test]: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'jkliop',
            database: 'myapp_test'
        },
        pool: {
            min: 2,
            max: 10
        },
        // determine where automatically generated go & from where seed file will be run
        // note in unit test, this directory is overrided in code
        // todo: remove overrided code.
        seeds: {
            directory: './seeds/' + ENV.test
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
