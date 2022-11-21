exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('TipoRestricao').del()
      .then(function () {
        // Inserts seed entries
        return knex('TipoRestricao').insert([ 
          {id_tipo_restricao: 1, nm_tipo_restricao: 'Atividade Física'},
          {id_tipo_restricao: 2, nm_tipo_restricao: 'Serviço Externo'}, 
        ]);
      });
  };