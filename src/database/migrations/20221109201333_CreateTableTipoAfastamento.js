/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('tipoafastamento', function(table){
        table.integer('id_tipo_afastamento').notNullable()
        table.string('nm_tipo_afastamento').notNullable()


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('tipoafastamento')
  
};
