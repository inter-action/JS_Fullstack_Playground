import * as chai from 'chai';
const {expect, assert} = chai;
import * as bluebird from 'bluebird';

import { KnexInstance, KnexConstants } from '../../db'

const {User, Users} = require('../user');

const failed_test = (done: any) => {
    return (error: any) => {
        done();
        console.log(error);
        assert(false, 'test failed');
    }
}
describe('Array', function () {
    beforeEach((done) => {// run each test in this block
        KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
            .then(() => {
                return KnexInstance.migrate.latest(KnexConstants.MIGRATION)
            }).then(() => {
                done()
            })
    });

    afterEach((done) => {
        KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
            .then(function () {
                done();
            });
    });

    describe('# User.save', function () {
        it('test save user', function (done) {
            let user: any = new User({ username: 'alex', email: 'someemail@qq.com', password: 'fdsafdas' });
            user.save().then((model: any) => {
                expect(model).to.be.ok;
            }).then(() => {
                return User.findOne({ username: 'alex' }).then((user: any) => {
                    expect(user.attributes).to.have.property('username', 'alex');
                    expect(user.attributes).to.have.property('email', 'someemail@qq.com');
                    done()
                })
            }).catch(failed_test(done));
        });
    });

    describe('# Users.save ', function () {
        it('test batch save user', function (done) {
            const users = Users.forge([
                { username: 'alex', email: 'someemail@qq.com', password: 'fdsafdas' },
                { username: 'max', email: 'max@qq.com', password: 'fdsafdas' }
            ]);

            bluebird.all(users.invokeThen('save')).then(() => {
                return User.findAll().then((data: any) => {
                    // console.log('result collection is', data.length)
                    expect(data.length).to.eq(2);
                    done()
                })
            }).catch(failed_test(done))
        });
    });
});
