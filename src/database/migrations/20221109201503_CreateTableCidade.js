/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('Cidade', function(table){
        table.increments('id_cidade').primary().notNullable()
        table.string('nm_cidade').notNullable()
        table.float('lat_cidade').notNullable()
        table.float('lng_cidade').notNullable()


        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('Cidade')
  
};
