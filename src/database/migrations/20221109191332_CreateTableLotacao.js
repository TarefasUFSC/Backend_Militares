/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Lotacao', function(table){
        table.increments('id_lotacao').primary().notNullable();
        table.integer('id_regiao').notNullable();
        table.integer('id_batalhao').notNullable();
        table.foreign('id_batalhao').references('id_batalhao').inTable('Batalhao').onDelete('CASCADE');
        table.integer('id_companhia').notNullable();
        table.integer('id_pelotao').notNullable();
        table.integer('id_grupo').notNullable();
        table.integer('id_cidade').unsigned();
        table.foreign('id_cidade').references('id_cidade').inTable('Cidade').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Lotacao');
};
