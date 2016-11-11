/*
https://github.com/chaijs/chai-http
http://chaijs.com/api/bdd/
http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WCVFo6J96NZ
http://mherman.org/blog/2016/04/28/test-driven-development-with-node/#.WCUx56J96NY
*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index').server;
const should = chai.should();

const expect = chai.expect
chai.use(chaiHttp);

// https://www.smashingmagazine.com/2016/08/getting-started-koa-2-async-functions/

describe('app', function () {
    it('should return a correct msg GET', function (done) {
        chai.request(server)
            .get('/')
            .end(function (err: any, res: any) {
                expect(err).to.be.null
                expect(res.text).to.contain('Hello')
                res.should.have.status(200);
                done();
            });
    });
});