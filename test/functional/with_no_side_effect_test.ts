const ava = require("ava");

import { seed, runWithFilter, connect } from "./func_test_util"
// import { runTvShowTest } from "./_tv_shows"
// import { runRegisterTest } from "./_auth";

ava.before(async _ => {
    await connect()
    await seed();
});

// runTvShowTest();
// runRegisterTest();

runWithFilter((module, key, hasSideEffect) => {
    if (hasSideEffect) return;
    else module[key]();
})

ava(`dumb test`, t => {
    t.is(1, 1);
});


