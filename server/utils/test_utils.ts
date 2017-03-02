const ava = require("ava");

import { initConfig } from "../config";
import { getConnection } from "../db/typeorm";


export function cleanDbEachTest() {
    ava.before(async _ => {
        await initConfig();
    });

    ava.beforeEach(async _ => {
        await getConnection().syncSchema(true);
    })
}

export function initConfiguration() {
    ava.before(async _ => {
        await initConfig();
    });
}