/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('MilitarAlocacao', function(table){
        table.integer("id_militar_alocacao").primary().unique().notNullable();
        table.integer("matricula_militar").references("matricula").inTable("militares").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarAlocacao');
};
