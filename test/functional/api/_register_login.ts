const ava = require('ava');
import { chai, server } from '../func_test_util';
const {assert} = chai;


export function runRegisterTest() {
    let TAG = 'API_TEST:rister&login';
    ava.cb(`${TAG}: register should success`, t => {
        chai.request(server)
            .post('/api/register')
            .send({
                username: 'alexafdsf',
                email: '243127392@qq.com',
                password: 'fuckyouguys'
            })
            .end(function (_, res) {
                res.should.have.status(200);
                t.end();
            });
    })


    ava.cb(`${TAG}: register should fail on no password`, t => {
        chai.request(server)
            .post('/api/register')
            .send({
                username: 'alexafdsf',
                email: '243127392@qq.com',
            })
            .end(function (_, res) {
                assert(res.status !== 200);
                t.end();
            });
    })


    ava.cb(`${TAG}: register should fail when failing validation: username contains illegal character`, t => {
        chai.request(server)
            .post('/api/register')
            .send({
                username: 'same$%^&*',
                email: '243127392@qq.com',
            })
            .end(function (_, res) {
                assert(res.status === 401, 'register should fail with 401');
                t.end();
            });
    })

    ava.cb(`${TAG}: auth success`, t => {
        chai.request(server)
            .post('/api/auth')
            .send({
                username: 'bran_stark',
                password: 'fuckyouguys',
            })
            .end(function (_, res) {
                assert(res.status === 200);
                assert(typeof res.body.data === 'string' && res.body.data)
                t.end();
            });
    })

    ava.cb(`${TAG}: ensure user should success`, t => {
        chai.request(server)
            .post('/api/auth')
            .send({
                username: 'bran_stark',
                password: 'fuckyouguys',
            })
            .end(function (_, res) {
                assert(res.status === 200);
                let token = res.body.data;

                chai.request(server)
                    .get('/api/test_auth')
                    .set('authorization', `Bearer ${token}`)
                    .end(function (_, res) {
                        assert(res.status === 200);
                        t.end();
                    });
            });
    })

    ava.cb(`${TAG}: ensure user should fail on wrong authtoken`, t => {

        chai.request(server)
            .get('/api/test_auth')
            .set('authorization', `Bearer fdsafdsafs`)
            .end(function (_, res) {
                assert(res.status === 401);
                t.end();
            });
    })

    // todo: auth should also be successful with email


    // ava.cb(`${TAG}: login should success`, t => {
    //     chai.request(server)
    //         .post('/api/login')
    //         .send({
    //             email: '243127392@qq.com',
    //             password: 'fuckyouguys'
    //         })
    //         .end(function (_, res) {
    //             res.should.have.status(200);
    //             t.end();
    //         });
    // });
}
