/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('lotacao', function(table){
        table.increments('id_lotacao').primary().notNullable()
        table.integer('id_regiao').notNullable()
        table.integer('id_batalhao').notNullable()
        table.integer('id_companhia').notNullable()
        table.integer('id_pelotao').notNullable()
        table.integer('id_grupo').notNullable()
        table.integer('id_cidade').notNullable().references('id_cidade').inTable('Cidade')
        
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('lotacao')
  
};
