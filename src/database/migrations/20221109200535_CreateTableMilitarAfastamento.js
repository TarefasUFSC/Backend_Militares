/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarAfastamento', function(table){
        table.increments('id_militar_afastamento').primary().notNullable()
        table.integer('matricula_militar').notNullable().references('matricula_militar').inTable('Militar')
        table.integer('id_tipo_afastamento').notNullable().references('id_tipo_afastamento').inTable('TipoAfastamento')
        table.timestamp('dt_inicio')
        table.timestamp('dt_fim')


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('MilitarAfastamento')
  
};
