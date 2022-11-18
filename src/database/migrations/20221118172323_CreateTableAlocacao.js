/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Alocacao', function(table){
        table.integer('id_alocacao').primary().unique().notNullable();
        table.string("desc_alocacao").notNullable();
        table.timestamp("dt_alocacao").notNullable();
        table.json("filtros_utilizados")
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Alocacao');
};
