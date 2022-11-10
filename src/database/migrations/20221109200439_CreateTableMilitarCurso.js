/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarCurso', function(table){
        table.integer('id_curso_militar').notNullable()
        table.integer('matricula_militar').notNullable()
        table.integer('id_curso').notNullable()

        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('MilitarCurso')
  
};
