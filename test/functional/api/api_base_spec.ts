const ava = require('ava');

import { KnexInstance, KnexConstants } from '../func_test_util'
import { runTvShowTest } from './_tv_shows'
import { runRegisterTest } from './_register_login';

ava.beforeEach(async _ => {// run each test in this block
    await KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
    await KnexInstance.migrate.latest(KnexConstants.MIGRATION)
    return await KnexInstance.seed.run(KnexConstants.SEED)
});

ava.afterEach(async _ => {
    return await KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
});

runTvShowTest();
runRegisterTest();