exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('TipoTempoAnterior').del()
      .then(function () {
        // Inserts seed entries
        return knex('TipoTempoAnterior').insert([
            {id_tipo_restricao: 0, nm_tipo_restricao: 'Atividade Fisica'},    
            {id_tipo_restricao: 1, nm_tipo_restricao: 'Serviço Extreno'}    
        ]);
      });
  };
