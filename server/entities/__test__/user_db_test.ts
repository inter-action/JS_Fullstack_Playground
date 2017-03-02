const ava = require('ava');
import { Repository } from 'typeorm';

import { cleanDbEachTest } from '../../utils/test_utils';
import { getUserAccess, User } from '../../entities';

cleanDbEachTest();

let userResp: Repository<User>;

ava.beforeEach(async _ => {
    let userAccess = getUserAccess();
    userResp = userAccess.getRespsitory();
})

let tag = '#User: '
ava.serial(`${tag} create user`, async t => {
    let user = User.create('alexander_mahone', '243242@qq.com', 'freakingpasswd')
    let dbuser = await userResp.persist(user);
    t.true(dbuser != null)
});


ava.serial(`${tag} create user shoudl success via valid js user object coercion`, async t => {
    let user = User.convertUser({ username: 'alexander_mahone', email: '243242@qq.com', password: 'freakingpasswd' })
    let dbuser = await userResp.persist(user);
    t.true(dbuser != null);
    t.is(dbuser.username, 'alexander_mahone');
});

ava.serial(tag + '# update user status', async t => {
    let user = User.create('alexander_mahone', '243242@qq.com', 'freakingpasswd')
    let model = await userResp.persist(user);
    t.truthy(model);
    model.status = 1;
    let updated = await userResp.persist(model)
    t.is(updated.status, 1)
})


ava.serial(`${tag} find user`, async t => {
    let user = User.create('alexander_mahone', '243242@qq.com', 'freakingpasswd')
    await userResp.persist(user);
    let find = await getUserAccess().findOne({ email: user.email })
    t.true(find != null)
});


ava.serial(tag + 'should not save user when failing validation: no password', async t => {
    let user = User.create('alexander_mahone', 'someemail@qq.com', '')
    try {
        await getUserAccess().getRespsitory().persist(user)
    } catch (_e) {
        return t.pass();
    }
    return t.fail('this shouldn\'t got executed');
})


ava.serial(tag + 'should not save user when failing validation: username length', async t => {
    let user = User.create('same', 'someemail@qq.com', 'somedumbpasswrod')
    try {
        await getUserAccess().getRespsitory().persist(user)
    } catch (_e) {
        return t.pass();
    }

    t.fail('test failed');
})


ava.serial(tag + '# update user with invalid spec', async t => {
    let user = User.create('alexfdsfds', 'someemail@qq.com', 'somedumbpasswrod')
    let model = await getUserAccess().getRespsitory().persist(user);
    delete model.password
    model.email = '243242'
    try {
        let updated = await getUserAccess().getRespsitory().persist(model)
        console.log('updated: ', updated)
    } catch (_e) {
        return t.pass();
    }
    t.fail()
})