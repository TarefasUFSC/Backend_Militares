/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('TipoTempoAnterior', function(table){

        table.integer('id_tipo_tempo').primary()
        table.text('nm_tipo_tempo')
        table.boolean('is_militar')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.dropTable('TipoTempoAnterior');
  
};