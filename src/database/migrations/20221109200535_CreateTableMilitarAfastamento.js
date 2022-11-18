/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('militarafastamento', function(table){
        table.integer('id_militar_afastamento').primary().notNullable()
        table.integer('matricula_militar').notNullable()
        table.integer('id_tipo_afastamento').notNullable()
        table.timestamp('dt_inicio')
        table.timestamp('dt_fim')


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('militarafastamento')
  
};
