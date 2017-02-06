import { chai, server } from '../func_test_util';

export function runRegisterTest() {
    describe('Register & Login', function () {
        it('register should success', function (done) {
            chai.request(server)
                .post('/api/register')
                .send({
                    username: 'alex',
                    email: '243127392@qq.com',
                    password: 'fuckyouguys'
                })
                .end(function (_, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('login should success', function (done) {
            chai.request(server)
                .post('/api/login')
                .send({
                    email: '243127392@qq.com',
                    password: 'fuckyouguys'
                })
                .end(function (_, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });
}