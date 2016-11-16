import * as chai from 'chai'

// KnexInstance
import { server } from '../../server/index'
import { KnexInstance } from '../../server/data/db/knex'
import { Constants } from '../util'
import { ENV } from '../../server/utils'


// todo: fix this
// import * as chaiHttp from 'chai-http';
const chaiHttp = require('chai-http')
const should = chai.should()

const expect = chai.expect
chai.use(chaiHttp);

process.env.NODE_ENV = ENV.test // set env

export const KNEX_CONFIGS = {
    MIGRATION: {
        directory: Constants.KNEX_MIGRATION_PATH
    },

    SEED: {
        directory: Constants.KNEX_SEEDS_PATH
    }
}
export { chai, chaiHttp, server, should, expect, KnexInstance }