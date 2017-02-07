import * as chai from 'chai';
import { get_mysql_env } from '../env';

const {assert} = chai;

// these tests require `require('dotenv').config();` call
// this is made in the server/index.ts 
// I dont quite sure how that is called from test run
// but that's just what the fact is.
describe('#dotenv', function () {
    it('should get correct mysql config', function () {
        let MYSQL_ENV = get_mysql_env();
        assert.equal(MYSQL_ENV.HOST, '127.0.0.1');
        assert.equal(MYSQL_ENV.DB, 'myapp');
        assert.equal(MYSQL_ENV.USER, 'root');
        assert.equal(MYSQL_ENV.PASSWORD, 'jkliop');
    });

    it('command line should override .env file', function () {
        assert.equal(process.env.NODE_ENV, 'test');
    });
});