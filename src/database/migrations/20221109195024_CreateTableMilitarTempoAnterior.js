/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarTempoAnterior', function(table){
        table.increments('id_militar_tempo_anterior').primary().notNullable();
        table.integer('matricula_militar').notNullable();
        table.integer('id_tipo_tempo').unsigned();
        table.foreign('id_tipo_tempo').references('id_tipo_tempo').inTable('TipoTempoAnterior').onDelete('CASCADE');
        table.integer('tempo_dias');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarTempoAnterior');
};
