import 'reflect-metadata';
const ava = require('ava');

import { User } from '../user';

let tag = '#User#static: '

ava.only(tag + 'generateResetToken should be valid properly', async t => {
    let user = User.createUser('some_username', 'someemail@qq.com', 'somepassword')

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = User.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let result = await User.validateResetToken(token, async () => {
        return user
    })
    t.true(result.isRight());
    t.is(user.email, result.getRight().email);
})


ava.only(tag + 'validateResetToken should reject on invalid token', async t => {
    let user = User.createUser('some_username', 'someemail@qq.com', 'somepassword')

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = User.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let result = await User.validateResetToken(token + 'c', async () => {
        return user
    })
    t.true(result.isLeft());
})