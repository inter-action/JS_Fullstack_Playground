import * as KnexModule from "knex";

/*
create seeds:

knex seed:run --env test --knexfile build/server/db/knexfile.js
*/
exports.seed = async function (knex: KnexModule) {
    await seed_shows(knex);
    await seed_users(knex)
};

function seed_shows(knex: KnexModule) {
    // Deletes ALL existing entries
    return knex("shows").del()
        // .then(function () {
        //   return Promise.all([
        //     // Inserts seed entries
        //     knex("table_name").insert({id: 1, colName: "rowValue1"}),
        //     knex("table_name").insert({id: 2, colName: "rowValue2"}),
        //     knex("table_name").insert({id: 3, colName: "rowValue3"})
        //   ]);
        // });
        .then(function () { // Inserts seed entries one by one in series
            return knex("shows").insert({
                name: "Suits",
                channel: "USA Network",
                genre: "Drama",
                rating: 3,
                explicit: false
            });
        }).then(function () {
            return knex("shows").insert({
                name: "Game of Thrones",
                channel: "HBO",
                genre: "Fantasy",
                rating: 5,
                explicit: true
            });
        }).then(function () {
            return knex("shows").insert({
                name: "South Park",
                channel: "Comedy Central",
                genre: "Comedy",
                rating: 4,
                explicit: true
            });
        }).then(function () {
            return knex("shows").insert({
                name: "Mad Men",
                channel: "AMC",
                genre: "Drama",
                rating: 3,
                explicit: false
            });
        });
}

function withTable(table: KnexModule.QueryBuilder) {
    return (func: (table: KnexModule.QueryBuilder) => Promise<any>) => {
        return func(table)
    }
}


async function seed_users(knex: KnexModule) {
    return withTable(knex("user"))(async table => {
        await <Promise<any>>table.insert({
            uuid: "4c809271-468c-46cd-9c67-000a3c86d341",
            username: "bran_stark",
            // raw password: fuckyouguys
            password: "$2a$10$Me6ee0U0pwsA9QrdmanvjOi1EurxcWltCsOaesoxt4HWFUWKuUhjW",
            email: "bran_stark@ele.me",
            created_at: new Date(),
            updated_at: new Date()
        })

        return await <Promise<any>>table.insert({
            uuid: "431c71a9-b93b-4fd7-809c-3b3dfa1f7ac4",
            username: "mahone",
            password: "mahone_password",
            email: "mahone_email",
            created_at: new Date(),
            updated_at: new Date()
        })
    })
}



