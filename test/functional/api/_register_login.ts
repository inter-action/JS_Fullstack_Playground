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