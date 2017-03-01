import * as path from 'path';
import { createConnection, getConnectionManager } from 'typeorm';
import { ENV_UTILS } from '../utils';


export function connect() {
    let MYSQL_ENV_CONFIG = ENV_UTILS.get_mysql_env();
    console.log('MYSQL_ENV_CONFIG', MYSQL_ENV_CONFIG)
    return createConnection({
        driver: {
            type: 'mysql',
            host: MYSQL_ENV_CONFIG.HOST,
            port: 3306,
            username: MYSQL_ENV_CONFIG.USER,
            password: MYSQL_ENV_CONFIG.PASSWORD,
            database: MYSQL_ENV_CONFIG.DB
        },
        entities: [
            path.resolve(__dirname, '../entities/*.js')
        ]
    })
}

export function getConnection() {
    return getConnectionManager().get();
}