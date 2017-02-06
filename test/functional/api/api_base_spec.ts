import { KnexInstance, KNEX_CONFIGS } from '../func_test_util'
import { runTvShowTest } from './_tv_shows'
import { runRegisterTest } from './_register_login';

describe('API Routes', function () {
    beforeEach((done) => {// run each test in this block
        KnexInstance.migrate.rollback(KNEX_CONFIGS.MIGRATION)
            .then(() => {
                KnexInstance.migrate.latest(KNEX_CONFIGS.MIGRATION)
                    .then(() => {
                        return KnexInstance.seed.run(KNEX_CONFIGS.SEED)
                            .then(() => {
                                done();
                            });
                    });
            });
    });

    afterEach((done) => {
        KnexInstance.migrate.rollback(KNEX_CONFIGS.MIGRATION)
            .then(function () {
                done();
            });
    });

    runTvShowTest();
    runRegisterTest();
});