/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Militares', function (table) {
        table.increments('matricula').primary().unique().notNullable();
        table.string('nome').notNullable();
        table.string('sexo').notNullable();
        table.integer('posto');
        table.foreign('posto').references('id_posto').inTable('Posto').onDelete('CASCADE');
        table.integer('antiguidade').notNullable();
        table.integer('id_lotacao').notNullable();
        table.foreign('id_lotacao').references('id_lotacao').inTable('Lotacao').onDelete('CASCADE');
        table.timestamp('dt_ingresso');
        table.timestamp('dt_nascimento');
        table.integer('licencas_esp_acc');
        table.integer('id_comportamento').unsigned();
        table.foreign('id_comportamento').references('id_comportamento').inTable('Comportamento').onDelete('CASCADE');
        table.string('endereco').notNullable();
        table.timestamp('ferias');
        table.text('img_perfil');
        table.timestamp("dt_aposentadoria");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Militares');
};
