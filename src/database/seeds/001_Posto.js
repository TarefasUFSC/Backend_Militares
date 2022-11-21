exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Posto').del()
      .then(function () {
        // Inserts seed entries
        return knex('Posto').insert([
          {id_posto: 1, rank_posto: 12, nm_posto: 'Soldado'},
          {id_posto: 2, rank_posto: 11, nm_posto: 'Cabo'},
          {id_posto: 3, rank_posto: 10, nm_posto: 'Sargento'},
          {id_posto: 4, rank_posto: 9, nm_posto: 'Subtenente'},
          {id_posto: 5, rank_posto: 8, nm_posto: 'Tenente'},
          {id_posto: 6, rank_posto: 7, nm_posto: 'Capitão'},
          {id_posto: 7, rank_posto: 6, nm_posto: 'Major'},
          {id_posto: 8, rank_posto: 5, nm_posto: 'Tenente Coronel'},
          {id_posto: 9, rank_posto: 4, nm_posto: 'Coronel'},
          {id_posto: 10, rank_posto: 3, nm_posto: 'General de Brigada'},
          {id_posto: 11, rank_posto: 2, nm_posto: 'General de Divisão'},
          {id_posto: 12, rank_posto: 1, nm_posto: 'General de Exército'},
            
        ]);
      });
  };