exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Comportamento').del()
      .then(function () {
        // Inserts seed entries
        return knex('Comportamento').insert([
          {id_comportamento: 1, nm_comportamento: 'Excepcional', rank_comportamento: 0},
          {id_comportamento: 2, nm_comportamento: 'Ótimo', rank_comportamento: 1},
          {id_comportamento: 3, nm_comportamento: 'Bom', rank_comportamento: 2},
          {id_comportamento: 4, nm_comportamento: 'Ruim', rank_comportamento: 3}      
        ]);
      });
  };