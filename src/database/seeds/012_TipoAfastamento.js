exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('TipoAfastamento').del()
      .then(function () {
        // Inserts seed entries
        return knex('TipoAfastamento').insert([  
            {id_tipo_afastamento: 1, nm_tipo_afastamento: 'LTS'},
            {id_tipo_afastamento: 2, nm_tipo_afastamento: 'LTSPF'},
            {id_tipo_afastamento: 3, nm_tipo_afastamento: 'LE'},
            {id_tipo_afastamento: 4, nm_tipo_afastamento: 'Férias'},
        ]);
      });
  };