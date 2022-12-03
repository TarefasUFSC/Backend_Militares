exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Alocacao').del()
      .then(function () {
        // Inserts seed entries
        return knex('Alocacao').insert([  
            {id_alocacao: 1, desc_alocacao: "test", dt_alocacao: parseInt(new Date(2022,12,12).getTime()/1000) },
            {id_alocacao: 2, desc_alocacao: "test", dt_alocacao: parseInt(new Date(2022,12,12).getTime()/1000) },
        ]);
      });
  };