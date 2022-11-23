exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('MilitarAfastamento').del()
      .then(function () {
        // Inserts seed entries
        return knex('MilitarAfastamento').insert([  
            {id_militar_afastamento: 1, id_tipo_afastamento: 1, matricula_militar: 900002, dt_inicio: parseInt(new Date(2022,01,01).getTime()/1000), dt_fim: parseInt(new Date(2022,12,12).getTime()/1000)},
            {id_militar_afastamento: 2, id_tipo_afastamento: 1, matricula_militar: 900003, dt_inicio: parseInt(new Date(2022,04,09).getTime()/1000), dt_fim: parseInt(new Date(2022,05,10).getTime()/1000)},
            {id_militar_afastamento: 3, id_tipo_afastamento: 2, matricula_militar: 900004, dt_inicio: parseInt(new Date(2022,04,10).getTime()/1000), dt_fim: parseInt(new Date(2022,06,11).getTime()/1000)},
            {id_militar_afastamento: 4, id_tipo_afastamento: 3, matricula_militar: 900007, dt_inicio: parseInt(new Date(2022,04,09).getTime()/1000), dt_fim: parseInt(new Date(2022,05,10).getTime()/1000)},
            {id_militar_afastamento: 5, id_tipo_afastamento: 4, matricula_militar: 900002, dt_inicio: parseInt(new Date(2022,04,09).getTime()/1000), dt_fim: parseInt(new Date(2022,05,10).getTime()/1000)},
        ]);
      });
  };