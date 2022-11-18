/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarIdioma', function(table){
        table.integer('id_militar_idioma').primary()
        table.integer('id_idioma')
        table.integer('matricula_militar')

        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('MilitarIdioma')
  
};
