const ava = require("ava");

import { resetToken, User } from "../user";
import { initConfiguration } from "../../utils/test_utils";
let tag = "#User#static: "

initConfiguration();
ava(tag + "generateResetToken should be valid properly", async t => {
    let user = User.create("some_username", "someemail@qq.com", "somepassword")

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = resetToken.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let result = await resetToken.validateResetToken(token, async () => {
        return user
    })
    t.true(result.isRight());
    t.is(user.email, result.getRight().email);
})


ava(tag + "validateResetToken should reject on invalid token", async t => {
    let user = User.create("some_username", "someemail@qq.com", "somepassword")

    let ONE_DAY_MILISEC = 24 * 3600 * 1000;
    let token = resetToken.generateResetToken(Date.now() + ONE_DAY_MILISEC, user.email, user.password);
    let result = await resetToken.validateResetToken(token + "c", async () => {
        return user
    })
    t.true(result.isLeft());
})