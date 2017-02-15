const ava = require('ava');
import { chai, server } from '../func_test_util';
const {assert} = chai;

let TAG = 'API_TEST:rister&login';

export function withSideEffect() {
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



    // todo: cant make this test work, test would throw error
    // at request2 with return status 400, but there should be no error 
    // in this app with status code 400, now I suspect `connection: close`
    // header cause this, i could delay the time between requests.

    // ava.only(`${TAG}: logout should work`, async t => {
    //     let agent = chai.request.agent(server)
    //     let resp1: any = await toPromise(
    //         agent.post('/api/auth')
    //             .send({
    //                 username: 'bran_stark',
    //                 password: 'fuckyouguys',
    //             })
    //     )
    //     assert(resp1.status === 200)

    //     let resp2: any = await toPromise(
    //         agent.post('/api/logout')
    //     )
    //     assert(resp2.status === 200);

    //     let resp3: any = await toPromise(
    //         agent.get('/api/test_auth')
    //     )

    //     assert(resp3.status === 401);
    // })
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


export function noSideEffect() {
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

    ava(`${TAG}: logined user able to send a second request without auth token`, async t => {
        // preserve cookie using agent
        let agent = await chai.request.agent(server)
        let resp1: any = await agent.post('/api/auth')
            .send({
                username: 'bran_stark',
                password: 'fuckyouguys',
            })
        t.is(resp1.status, 200)

        let resp2: any = await agent.get('/api/test_auth')
        t.is(resp2.status, 200)
    })
}