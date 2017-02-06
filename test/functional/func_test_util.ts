import * as chai from 'chai'

// KnexInstance
import { server } from '../../server/index'
import { KnexInstance, KnexConstants } from '../../server/data/db'
import { ENV } from '../../server/utils'


// todo: fix this
// import * as chaiHttp from 'chai-http';
const chaiHttp = require('chai-http')
const should = chai.should()

const expect = chai.expect
chai.use(chaiHttp);

// set from makefile
// process.env.NODE_ENV = ENV.test // set env

export { chai, chaiHttp, server, should, expect, KnexInstance, KnexConstants }