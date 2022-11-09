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


        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('cidade')
  
};
