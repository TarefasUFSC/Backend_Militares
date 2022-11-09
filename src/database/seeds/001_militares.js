/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('militares').del()
  await knex('militares').insert([
    {nome: 'Joaquin', sexo: 'M'},
    {nome: 'Anita', sexo: 'F'}
  ]);
};
