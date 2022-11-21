/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarRestricao', function(table){
        table.integer('id_militar_restricao').primary().notNullable()
        table.integer('matricula_militar').notNullable().references('matricula_militar').inTable('Militar')
        table.integer('id_tipo_restricao').notNullable().references('id_tipo_restricao').inTable('TipoRestricao')
        table.timestamp('dt_fim').notNullable()


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('MilitarRestricao')
  
};
