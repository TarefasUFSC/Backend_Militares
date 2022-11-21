/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Militares', function(table){
        table.increments('matricula').primary().unique().notNullable()
        table.string('nome').notNullable()
        table.string('sexo').notNullable()
        table.integer('posto').references('id_posto').inTable('posto').notNullable()
        table.integer('antiguidade').notNullable()
        table.integer('lotacao').notNullable()
        table.timestamp('dt_ingresso')
        table.timestamp('dt_nascimento')
        table.integer('licencas_esp_acc')
        table.integer('id_comportamento').references('id_comportamento').inTable('comportamento')
        table.string('endereco').notNullable()
        table.timestamp('ferias')
        table.text("img_perfil")
        table.timestamp("dt_aposentadoria")

        
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTableIfExists('Militares')
  
};
