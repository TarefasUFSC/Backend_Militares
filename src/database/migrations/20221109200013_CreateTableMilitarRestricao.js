/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarRestricao', function(table){
        table.increments('id_militar_restricao').primary().notNullable();
        table.integer('matricula_militar').unsigned();
        table.foreign('matricula_militar').references('matricula').inTable('Militares').onDelete('CASCADE');
        table.integer('id_tipo_restricao').unsigned();
        table.foreign('id_tipo_restricao').references('id_tipo_restricao').inTable('TipoRestricao').onDelete('CASCADE');
        table.timestamp('dt_fim').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarRestricao');
};
