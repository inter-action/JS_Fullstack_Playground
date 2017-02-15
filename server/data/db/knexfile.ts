import { ENV, ENV_UTILS } from '../../utils'

let MYSQL_ENV_CONFIG;
if (!ENV_UTILS.is_test()) {
    MYSQL_ENV_CONFIG = ENV_UTILS.get_mysql_env();
}

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
        connection: MYSQL_ENV_CONFIG && {
            host: MYSQL_ENV_CONFIG.HOST,
            user: MYSQL_ENV_CONFIG.USER,
            password: MYSQL_ENV_CONFIG.PASSWORD,
            database: MYSQL_ENV_CONFIG.DB
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
        debug: false// enable debug, this option open knex query output
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
