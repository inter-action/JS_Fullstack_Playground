import * as path from 'path'
import { ENV } from '../../server/utils'
// path default relative to process.pwd(), normally that just project foldername
export const KNEX_MIGRATION_PATH = path.resolve('jssrc/data/db/migrations')
export const KNEX_SEEDS_PATH = path.resolve('jssrc/data/db/seeds/' + ENV.test)