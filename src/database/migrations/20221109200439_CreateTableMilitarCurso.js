/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('MilitarCurso', function(table){
        table.integer('id_curso_militar').notNullable();
        table.integer('matricula_militar').unsigned();
        table.foreign('matricula_militar').references('matricula').inTable('Militares').onDelete('CASCADE');
        table.integer('id_curso').unsigned();
        table.foreign('id_curso').references('id_curso').inTable('Curso').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('MilitarCurso');
};
