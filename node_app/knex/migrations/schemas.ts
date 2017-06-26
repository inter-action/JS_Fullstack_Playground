import * as KnexModule from "knex";

/*
from cli:
    knex migrate:latest --env test --knexfile  build/server/db/knexfile.js
*/

exports.up = async function (knex: KnexModule) {// create schema
    await <Promise<any>>knex.schema.createTable("shows", function (table) {
        table.increments();
        table.string("name").notNullable().unique();
        table.string("channel").notNullable();
        table.string("genre").notNullable();
        table.integer("rating").notNullable();
        table.boolean("explicit").notNullable();
    })

    return await <Promise<any>>knex.schema.createTable("user", function (table) {
        table.increments();
        table.string("uuid", 36).notNullable();
        table.string("username", 25).notNullable();
        table.string("password").notNullable();
        table.string("email", 200).notNullable().unique();
        table.string("from", 20).defaultTo("this_app");
        table.string("from_id", 200).defaultTo("");
        table.integer("status").defaultTo("0").comment(`
            0: none activiated
            1: activated
            2-5: warning stage
            6: locked`);
        table.timestamps();
    });
};

exports.down = async function (knex: KnexModule) {// drop schema
    await <Promise<any>>knex.schema.dropTable("shows")
    return await <Promise<any>>knex.schema.dropTable("user");
};
