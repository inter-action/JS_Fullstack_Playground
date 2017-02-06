import * as Knex from 'knex';
import * as path from 'path';

import { ENV } from '../../utils'

const environment = process.env.NODE_ENV || ENV.dev;
const config = require('./knexfile')[environment];
// return a knex instance
export const KnexInstance = Knex(config);

export const KnexConstants = {
    MIGRATION: {
        directory: path.resolve(__dirname, './migrations')
    },
    SEED: {
        directory: path.resolve(__dirname, `./seeds/${environment}`)
    }
}