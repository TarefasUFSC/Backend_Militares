exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('MilitarRestricao').del()
      .then(function () {
        // Inserts seed entries
        return knex('MilitarRestricao').insert([  
            {id_militar_restricao: 1, id_tipo_restricao: 1, matricula_militar: 900003, dt_fim:parseInt(new Date(2022,12,12).getTime()/1000)},
            {id_militar_restricao: 2, id_tipo_restricao: 2, matricula_militar: 900004, dt_fim:parseInt(new Date(2022,05,10).getTime()/1000)},
        ]);
      });
  };