/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('militares', function(table){
        table.integer('matricula').primary().unique().notNullable()
        table.text('nome').notNullable()
        table.text('sexo').notNullable()
        table.integer('posto').references('id_posto').inTable('posto').notNullable()
        table.integer('antiguidade').notNullable()
        table.integer('lotacao').notNullable()
        table.timestamp('dt_ingresso')
        table.timestamp('dt_nascimento')
        table.integer('licencas_esp_acc')
        table.integer('comportamento')
        table.text('endereco').notNullable()
        table.timestamp('ferias')

        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('militares')
  
};