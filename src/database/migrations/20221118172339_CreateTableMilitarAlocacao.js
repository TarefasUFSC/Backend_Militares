/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarAlocacao', function(table){
        table.increments("id_militar_alocacao").primary().unique().notNullable();
        table.integer("matricula_militar").unsigned();
        table.foreign("matricula_militar").references("matricula").inTable("Militares").onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarAlocacao');
};
