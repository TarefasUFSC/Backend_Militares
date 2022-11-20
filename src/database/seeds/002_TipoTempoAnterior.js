exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('TipoTempoAnterior').del()
      .then(function () {
        // Inserts seed entries
        return knex('TipoTempoAnterior').insert([
            {id_tipo_tempo: 0, nm_tempo: 'Privado', is_militar: false},     
            {id_tipo_tempo: 1, nm_tipo_tempo: 'Público SC', is_militar: false},     
            {id_tipo_tempo: 2, nm_tipo_tempo: 'Público Outros', is_militar: false},     
            {id_tipo_tempo: 3, nm_tipo_tempo: 'Militar', is_militar: true},     
        ]);
      });
  };
