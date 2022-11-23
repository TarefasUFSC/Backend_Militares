/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarIdioma', function(table){
        table.increments('id_militar_idioma').primary();
        table.integer('id_idioma');
        table.integer('matricula_militar').unsigned();
        table.foreign('matricula_militar').references('matricula').inTable('Militares').onDelete('CASCADE'); //esse aqui o emir tinha esquecido de mudar
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarIdioma');
};
