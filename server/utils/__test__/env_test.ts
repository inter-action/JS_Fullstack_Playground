import { assert } from 'chai';
const ava = require('ava');

import { ENV_UTILS } from '../env';

let origin_env = process.env;

ava.beforeEach(_ => {
    require('dotenv').config();
})

ava.afterEach(async _ => {
    process.env = origin_env;
});


ava('dotenv: should get correct mysql config', t => {
    let MYSQL_ENV = ENV_UTILS.get_mysql_env();
    assert.equal(MYSQL_ENV.HOST, '127.0.0.1');
    assert.equal(MYSQL_ENV.DB, 'myapp');
    assert.equal(MYSQL_ENV.USER, 'root');
    assert.equal(MYSQL_ENV.PASSWORD, 'jkliop');
    t.pass();
});

ava('dotenv: command line should override .env file', t => {
    assert.equal(process.env.NODE_ENV, 'test');
    t.pass();
});
