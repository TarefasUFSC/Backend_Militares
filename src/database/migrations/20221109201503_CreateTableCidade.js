/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('cidade', function(table){
        table.integer('id_cidade').primary().notNullable()
        table.text('nm_cidade').notNullable()
        table.float('lat_cidade').notNullable()
        table.float('lon_cidade').notNullable()


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('cidade')
  
};
