import * as typeorm from './typeorm'
export { typeorm };

import * as path from 'path';
import { ENV } from '../utils/env';

export function initConfig() {
    const env = process.env.NODE_ENV;

    if (!env) {
        throw new Error('process.env.NODE_ENV is not defined');
    }

    let result = require('dotenv').config({ path: path.resolve(__dirname, `./dotenv/${env}.env`) });
    if (result.error) {
        throw result.error
    }

    return setDB()
}


async function setDB() {
    const env = process.env.NODE_ENV;
    if (env === ENV.dev) {
        await typeorm.getConnection().syncSchema(true);
    }
}