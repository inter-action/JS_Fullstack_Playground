const ava = require('ava');

import { dbSeed, dbRollback, runWithFilter } from './func_test_util'

ava.beforeEach(dbSeed());
ava.afterEach(dbRollback());


runWithFilter((module, key, hasSideEffect) => {
    if (!hasSideEffect) return;
    else module[key]();
})

ava(`dumb test`, t => {
    t.is(1, 1);
});


