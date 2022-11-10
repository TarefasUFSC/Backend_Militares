/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Comportamento', function(table){
        table.integer('id_comportamento').notNullable()
        table.text('nm_comportamento')
        table.integer('rank_comportamento')


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('Comportamento')
  
};
