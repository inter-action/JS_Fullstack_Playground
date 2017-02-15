const ava = require('ava');

import { dbSeed, dbRollback, runWithFilter } from './func_test_util'
// import { runTvShowTest } from './_tv_shows'
// import { runRegisterTest } from './_auth';

ava.before(dbSeed());
ava.after(dbRollback());

// runTvShowTest();
// runRegisterTest();

runWithFilter((module, key, hasSideEffect) => {
    if (hasSideEffect) return;
    else module[key]();
})

ava(`dumb test`, t => {
    t.is(1, 1);
});


