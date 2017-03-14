const ava = require("ava");

import { seed, connect, runWithFilter } from "./func_test_util"

ava.before(async _ => {
    await connect()
});

ava.beforeEach(async _ => {
    await seed();
});


runWithFilter((module, key, isSerial) => {
    if (!isSerial) return;
    else module[key]();
})

ava(`dumb test`, t => {
    t.is(1, 1);
});


