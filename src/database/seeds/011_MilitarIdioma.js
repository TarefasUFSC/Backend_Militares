exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('MilitarIdioma').del()
      .then(function () {
        // Inserts seed entries
        return knex('MilitarIdioma').insert([  
            {id_militar_idioma: 1, id_idioma: 1, matricula_militar: 900003},
            {id_militar_idioma: 2, id_idioma: 2, matricula_militar: 900006},
            {id_militar_idioma: 3, id_idioma: 7, matricula_militar: 900009},
        ]);
      });
  };