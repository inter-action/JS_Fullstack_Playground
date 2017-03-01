const ava = require('ava');

import { ENV_UTILS } from '../env';
import { initConfig } from '../../config';

let origin_env = process.env;

ava.beforeEach(async _ => {
    await initConfig()
})

ava.afterEach(async _ => {
    process.env = origin_env;
});


ava('dotenv: should get correct mysql config', t => {
    let MYSQL_ENV = ENV_UTILS.get_mysql_env();
    t.is(MYSQL_ENV.HOST, '127.0.0.1');
    t.is(MYSQL_ENV.DB, 'myapp_test');
    t.is(MYSQL_ENV.USER, 'root');
    t.is(MYSQL_ENV.PASSWORD, 'jkliop');
    t.pass();
});

ava('dotenv: command line should override .env file', t => {
    t.is(process.env.TEST_OVERRIDE, 'test');
    t.pass();
});

// Generate a v4 UUID (random)
const uuidV4 = require('uuid/v4');

ava.skip('dotenv: command line should override .env file', _ => {
    console.log(uuidV4())
});
