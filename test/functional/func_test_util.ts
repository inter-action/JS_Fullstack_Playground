import * as chai from 'chai'

// KnexInstance
import { server } from '../../server/index'
import { KnexInstance, KnexConstants } from '../../server/data/db'


// todo: fix this
// import * as chaiHttp from 'chai-http';
const chaiHttp = require('chai-http')
const should = chai.should()

const expect = chai.expect
chai.use(chaiHttp);

export { chai, chaiHttp, server, should, expect, KnexInstance, KnexConstants }