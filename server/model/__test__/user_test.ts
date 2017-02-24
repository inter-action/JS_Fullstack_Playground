import { expect, assert } from 'chai';
const ava = require('ava');

import * as bluebird from 'bluebird';

import { KnexInstance, KnexConstants } from '../../data/db'
import { errors } from '../../utils'

const {User, Users} = require('../user');
import { IUser } from '../user';


ava.beforeEach(async _ => {
    await KnexInstance.migrate.rollback(KnexConstants.MIGRATION);
    return await KnexInstance.migrate.latest(KnexConstants.MIGRATION);
})


ava.afterEach(async _ => {
    return await KnexInstance.migrate.rollback(KnexConstants.MIGRATION)
});

let TAG = '#User.save: '

ava.serial(TAG + 'test save user', async t => {
    let user: any = <IUser>{ username: 'alexfdsfds', email: 'someemail@qq.com', password: 'fdsafdas' }
    let model = await User.addPr(user);
    t.truthy(model);
    model = await User.findOnePr({ username: 'alexfdsfds' }, { require: true })
    t.is(model.get('status'), 0);
    expect(model.toJSON()).to.have.property('username', 'alexfdsfds');
    expect(model.toJSON()).to.have.property('email', 'someemail@qq.com');
})

ava.serial(TAG + 'should not save user when failing validation: no password', async t => {
    let user: any = <IUser>{ username: 'samewell' };
    try {
        await User.addPr(user)
    } catch (err) {
        if (err instanceof errors.ValidationError) {
            return t.pass();
        } else {
            return t.fail('expect validation to work properly');
        }
    }
    return t.fail('this shouldn\'t got executed');
})


ava.serial(TAG + 'should not save user when failing validation: username length', async t => {
    let user: any = <IUser>{ username: 'same' };
    try {
        return await User.addPr(user).then(() => {
            assert(false, 'this should never got executed');
        });
    } catch (e) {
        if (e instanceof errors.ValidationError) {
            t.pass();
            return;
        }
    }

    t.fail('test failed');
})

ava.serial(TAG + '# test batch save user', async _ => {
    const users = Users.forge([
        { username: 'alexander-hx', email: 'someemail@qq.com', password: 'fdsafdas' },
        { username: 'samwell_tarlly', email: 'max@qq.com', password: 'fdsafdas' }
    ]);

    await bluebird.all(users.invokeThen('save'));
    return await User.findAllPr().then((data: any) => { expect(data.length).to.eq(2); })
})

ava.serial(TAG + '# update user with invalid spec', async t => {
    let user: any = <IUser>{ username: 'alexfdsfds', email: 'someemail@qq.com', password: 'fdsafdas' }
    let model = await User.addPr(user);
    model.set('email', '')
    try {
        await model.save();
    } catch (e) {
        return t.pass()
    }
    t.fail()
})


ava.serial(TAG + '# update user status', async t => {
    let user: any = <IUser>{ username: 'alexfdsfds', email: 'someemail@qq.com', password: 'fdsafdas' }
    let model = await User.addPr(user);
    t.truthy(model);
    model.set('status', 1)
    let updated = await model.save();
    t.is(updated.get('status'), 1)
    t.true(updated.isActivated())


    model.set('status', 6)
    updated = await model.save();
    t.is(updated.get('status'), 6)
    t.true(updated.isLocked())
})

