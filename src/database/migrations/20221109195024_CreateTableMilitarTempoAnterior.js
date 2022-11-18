/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('militartempoanterior', function(table){
        table.integer('id_militar_tempo_anterior').primary().notNullable()
        table.integer('matricula_militar').notNullable()
        table.integer('id_tipo_tempo')
        table.integer('tempo_dias')

        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('militartempoanterior')
  
};
