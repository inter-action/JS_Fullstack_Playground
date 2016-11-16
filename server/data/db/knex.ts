import { KnexFile } from '../util'
import { ENV } from '../../utils'

import * as Knex from 'knex'

const environment = process.env.NODE_ENV || ENV.dev;
const config = KnexFile[environment];
// return a knex instance
const KnexInstance = Knex(config);
export { KnexInstance }