/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.alterTable('TempoAnterior', function(table){

        table.integer('id_tipo_tempo').primary()
        table.text('nm_tipo_tempo')
        table.boolean('is_militar')

             table.timestamp('created_at').defaultTo(knex.fn.now())
             table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.alterTable('TempoAnterior', function(table){


        table.dropColumn('deleted_at')
    })
  
};