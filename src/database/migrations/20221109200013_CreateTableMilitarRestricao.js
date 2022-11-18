/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('militarrestricao', function(table){
        table.integer('id_militar_restricao').primary().notNullable()
        table.integer('matricula_militar').notNullable()
        table.integer('id_tipo_restricao').notNullable()
        table.timestamp('dt_inicio')
        table.timestamp('dt_fim')


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('militarrestricao')
  
};
