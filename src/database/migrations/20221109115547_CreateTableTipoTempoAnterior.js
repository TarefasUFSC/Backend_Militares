/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('TipoTempoAnterior', function(table){

        table.increments('id_tipo_tempo').primary()
        table.string('nm_tipo_tempo')
        table.boolean('is_militar')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.dropTableIfExists('TipoTempoAnterior');
  
};