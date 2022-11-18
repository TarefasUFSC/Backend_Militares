/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('tipocurso', function(table){
        table.integer('id_tipo_curso').primary().notNullable()
        table.integer('nm_tipo_curso')


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('tipocurso')
  
};
