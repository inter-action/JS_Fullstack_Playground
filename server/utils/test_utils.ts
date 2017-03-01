const ava = require('ava');

import { initConfig } from '../config';
import { connect, getConnection } from '../config/typeorm';


export function cleanDbEachTest() {
    ava.before(async _ => {
        await initConfig();
        await connect();
    });

    ava.beforeEach(async _ => {
        await getConnection().syncSchema(true);
    })
}

export function initConfiguration() {
    ava.before(async _ => {
        await initConfig();
    });
}