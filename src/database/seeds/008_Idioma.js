exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Idioma').del()
      .then(function () {
        // Inserts seed entries
        return knex('Idioma').insert([  
            {id_idioma: 1, nm_idioma: 'Inglês'},
            {id_idioma: 2, nm_idioma: 'Espanhol'},
            {id_idioma: 3, nm_idioma: 'Francês'},
            {id_idioma: 4, nm_idioma: 'Alemão'},
            {id_idioma: 5, nm_idioma: 'Italiano'},
            {id_idioma: 6, nm_idioma: 'Japonês'},
            {id_idioma: 7, nm_idioma: 'Mandarim'},
            {id_idioma: 8, nm_idioma: 'Russo'},
            {id_idioma: 9, nm_idioma: 'Árabe'},
            {id_idioma: 10, nm_idioma: 'Hindi'},
            {id_idioma: 11, nm_idioma: 'Português'},
            {id_idioma: 12, nm_idioma: 'Língua Brasileira de Sinais'},
            {id_idioma: 13, nm_idioma: 'Outro'},
        ]);
      });
  };