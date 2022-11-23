/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarAfastamento', function(table){
        table.increments('id_militar_afastamento').primary().notNullable();
        table.integer('matricula_militar').unsigned();
        table.foreign('matricula_militar').references('matricula').inTable('Militares').onDelete('CASCADE');
        table.integer('id_tipo_afastamento').unsigned();
        table.foreign('id_tipo_afastamento').references('id_tipo_afastamento').inTable('TipoAfastamento').onDelete('CASCADE');
        table.timestamp('dt_inicio');
        table.timestamp('dt_fim');        
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarAfastamento');
};
