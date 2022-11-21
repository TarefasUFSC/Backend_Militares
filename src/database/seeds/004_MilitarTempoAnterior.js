exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('MilitarTempoAnterior').del()
      .then(function () {
        // Inserts seed entries
        return knex('MilitarTempoAnterior').insert([     
            {id_militar_tempo_anterior: 2, matricula_militar: '900003', id_tipo_tempo: 1, tempo_dias: 720},    
            {id_militar_tempo_anterior: 5, matricula_militar: '900006', id_tipo_tempo: 2, tempo_dias: 365},         
            {id_militar_tempo_anterior: 7, matricula_militar: '900008', id_tipo_tempo: 3, tempo_dias: 5342}    
     
        ]);
      });
  };
