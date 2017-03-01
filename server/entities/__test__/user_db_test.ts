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

/*
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


*/