import { chai, chaiHttp, server, should, expect, KnexInstance, KNEX_CONFIGS } from '../func_test_util'


describe('API Routes', function () {
    beforeEach((done) => {
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


    describe('Get all shows', () => {
        it('should return all shows', function (done) {
            chai.request(server)
                .get('/api/tv_shows')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(4);
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('Suits');
                    res.body[0].should.have.property('channel');
                    res.body[0].channel.should.equal('USA Network');
                    res.body[0].should.have.property('genre');
                    res.body[0].genre.should.equal('Drama');
                    res.body[0].should.have.property('rating');
                    res.body[0].rating.should.equal(3);
                    res.body[0].should.have.property('explicit');
                    res.body[0].explicit.should.not.be.ok; // ok is like , a == truthy 
                    done();
                });
        });
    })




});