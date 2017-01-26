exports.up = function (knex: any) {// create schema
    return knex.schema.createTable('shows', function (table: any) {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('channel').notNullable();
        table.string('genre').notNullable();
        table.integer('rating').notNullable();
        table.boolean('explicit').notNullable();
    });
};

exports.down = function (knex: any) {// drop schema
    return knex.schema.dropTable('shows');
};
