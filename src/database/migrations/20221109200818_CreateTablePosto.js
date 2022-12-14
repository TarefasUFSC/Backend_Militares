/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Posto', function(table){
        table.increments('id_posto').primary().notNullable();
        table.integer('rank_posto').notNullable();
        table.string('nm_posto');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Posto');
};
