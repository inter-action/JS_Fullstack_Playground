import { KnexInstance, KnexConstants } from '../func_test_util'
import { runTvShowTest } from './_tv_shows'
import { runRegisterTest } from './_register_login';

describe('API Routes', function () {
    beforeEach((done) => {// run each test in this block
        KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
            .then(() => {
                KnexInstance.migrate.latest(KnexConstants.MIGRATION)
                    .then(() => {
                        KnexInstance.seed.run(KnexConstants.SEED)
                            .then(() => {
                                done();
                            });
                    });
            });
    });

    afterEach((done) => {
        KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
            .then(function () {
                done();
            });
    });

    runTvShowTest();
    runRegisterTest();
});