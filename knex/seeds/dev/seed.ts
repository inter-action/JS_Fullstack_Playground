import * as KnexModule from "knex";

/*
create seeds:

knex seed:run --env test --knexfile build/server/db/knexfile.js
*/
exports.seed = async function (knex: KnexModule) {
    await seed_users(knex)
};


function withTable(table: KnexModule.QueryBuilder) {
    return (func: (table: KnexModule.QueryBuilder) => Promise<any>) => {
        return func(table)
    }
}


async function seed_users(knex: KnexModule) {
    return withTable(knex("user"))(async table => {
        return await <Promise<any>>table.insert({
            uuid: "4c809271-468c-46cd-9c67-000a3c86d341",
            username: "bran_stark",
            // raw password: fuckyouguys
            password: "$2a$10$Me6ee0U0pwsA9QrdmanvjOi1EurxcWltCsOaesoxt4HWFUWKuUhjW",
            email: "243127395@qq.com",
            created_at: new Date(),
            updated_at: new Date()
        })
    })
}



