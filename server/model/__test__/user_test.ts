const ava = require('ava');

import { UserUtils, DBUser } from '../user';


let TAG_USER_UTILS = '#UserUtils: '

ava(TAG_USER_UTILS + 'generateResetToken should be valid properly', async t => {
    let user = <DBUser>{
        username: 'some_username',
        password: 'somepassword',
        email: 'someemail@qq.com'
    };

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = UserUtils.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let [error, nuser] = await UserUtils.validateResetToken(token, async () => {
        return user
    }, (user) => user)
    t.true(error == null);
    t.is(user.email, (nuser as any).email);
})


ava(TAG_USER_UTILS + 'validateResetToken should reject on invalid token', async t => {
    let user = <DBUser>{
        username: 'some_username',
        password: 'somepassword',
        email: 'someemail@qq.com'
    };

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = UserUtils.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let [error, nuser] = await UserUtils.validateResetToken(token + 'c', async () => {
        return user
    }, (user) => user)
    t.true(error != null);
    t.true(!nuser)
})