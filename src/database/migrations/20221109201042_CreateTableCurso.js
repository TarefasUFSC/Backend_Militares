/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Curso', function(table){
        table.integer('id_curso').primary().notNullable()
        table.string('nm_curso')
        table.integer('id_tipo_curso').references('id_tipo_curso').inTable('TipoCurso').notNullable()


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('Curso')
  
};
