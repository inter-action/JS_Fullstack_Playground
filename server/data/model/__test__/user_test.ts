import { expect, assert } from 'chai';
const ava = require('ava');

import * as bluebird from 'bluebird';

import { KnexInstance, KnexConstants } from '../../db'
import { errors } from '../../../utils'

const {User, Users} = require('../user');
import { IUser } from '../user';


ava.beforeEach(async _ => {
    await KnexInstance.migrate.rollback(KnexConstants.MIGRATION);
    return await KnexInstance.migrate.latest(KnexConstants.MIGRATION);
})


ava.afterEach(async _ => {
    return await KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
});


ava.serial('#User.save: test save user', async _ => {
    let user: any = new User(<IUser>{ username: 'alexfdsfds', email: 'someemail@qq.com', password: 'fdsafdas' });
    return await user.save().then((model: any) => {
        expect(model).to.be.ok;
    }).then(() => {
        return User.findOne({ username: 'alexfdsfds' }).then((user: any) => {
            expect(user.attributes).to.have.property('username', 'alexfdsfds');
            expect(user.attributes).to.have.property('email', 'someemail@qq.com');
        })
    })
})

ava.serial('#User.save: should not save user when failing validation: no password', async t => {
    let user: any = new User(<IUser>{ username: 'samewell' });
    return await user.save().then(() => {
        assert(false, 'this should never got executed');
    }).then(_ => {
        t.fail();
    }, e => {
        if (e instanceof errors.ValidationError) {
            t.pass();
        } else {
            t.fail();
        }
    })
})


ava.serial('#User.save: should not save user when failing validation: username length', async t => {
    let user: any = new User(<IUser>{ username: 'same' });

    try {
        return await user.save().then(() => {
            assert(false, 'this should never got executed');
        });
    } catch (e) {
        if (e instanceof errors.ValidationError) {
            t.pass();
            return;
        }
    }

    t.fail();
})


ava.serial('#User.save: should not save user when failing validation: username contains illegal character', async t => {
    let user: any = new User(<IUser>{ username: 'same$%^&*' });

    try {
        return await user.save().then(() => {
            assert(false, 'this should never got executed');
        });
    } catch (e) {
        if (e instanceof errors.ValidationError) {
            t.pass();
            return;
        }
    }

    t.fail();
})


ava.serial('#Users.save: test batch save user', async _ => {
    const users = Users.forge([
        { username: 'alexander-hx', email: 'someemail@qq.com', password: 'fdsafdas' },
        { username: 'samwell_tarlly', email: 'max@qq.com', password: 'fdsafdas' }
    ]);

    await bluebird.all(users.invokeThen('save'));
    return await User.findAll().then((data: any) => { expect(data.length).to.eq(2); })
})
