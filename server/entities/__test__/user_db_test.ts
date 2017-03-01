import 'reflect-metadata';
const ava = require('ava');
import { Repository } from 'typeorm';

import { cleanDbEachTest } from '../../utils/test_utils';
import { getConnection } from '../../config/typeorm';
import { getUserAccess, User } from '../../entities';

cleanDbEachTest();

let userResp: Repository<User>;
ava.beforeEach(async _ => {
    let userAccess = getUserAccess(getConnection());
    userResp = userAccess.getRespsitory();
})

let tag = '#User: '
ava.serial(`${tag} create user`, async t => {
    let user = User.createUser('alexander_mahone', '243242@qq.com', 'freakingpasswd')
    let dbuser = await userResp.persist(user);
    t.true(dbuser != null)
});

ava.serial(tag + '# update user status', async t => {
    let user = User.createUser('alexander_mahone', '243242@qq.com', 'freakingpasswd')
    let model = await userResp.persist(user);
    t.truthy(model);
    model.status = 1;
    let updated = await userResp.persist(model)
    t.is(updated.status, 1)
})
