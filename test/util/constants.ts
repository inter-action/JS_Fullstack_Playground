import * as path from 'path'
import { ENV } from '../../server/utils'

export const KNEX_MIGRATION_PATH = path.resolve(__dirname, '../../jssrc/data/db/migrations')
export const KNEX_SEEDS_PATH = path.resolve(__dirname, '../../jssrc/data/db/seeds/' + ENV.test)