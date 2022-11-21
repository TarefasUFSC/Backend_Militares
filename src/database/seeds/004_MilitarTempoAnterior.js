exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('MilitarTempoAnterior').del()
      .then(function () {
        // Inserts seed entries
        return knex('MilitarTempoAnterior').insert([
            {id_militar_tempo_anterior: 0, matricula_militar: '900001', id_tipo_tempo: 0, tempo_dias: 0},     
            {id_militar_tempo_anterior: 1, matricula_militar: '900002', id_tipo_tempo: 1, tempo_dias: 0},     
            {id_militar_tempo_anterior: 2, matricula_militar: '900003', id_tipo_tempo: 2, tempo_dias: 720},     
            {id_militar_tempo_anterior: 3, matricula_militar: '900004', id_tipo_tempo: 3, tempo_dias: 0},     
            {id_militar_tempo_anterior: 4, matricula_militar: '900005', id_tipo_tempo: 4, tempo_dias: 0},     
            {id_militar_tempo_anterior: 5, matricula_militar: '900006', id_tipo_tempo: 5, tempo_dias: 365},     
            {id_militar_tempo_anterior: 6, matricula_militar: '900007', id_tipo_tempo: 6, tempo_dias: 0},     
            {id_militar_tempo_anterior: 7, matricula_militar: '900008', id_tipo_tempo: 7, tempo_dias: 5342},     
            {id_militar_tempo_anterior: 8, matricula_militar: '900009', id_tipo_tempo: 8, tempo_dias: 0},     
            {id_militar_tempo_anterior: 9, matricula_militar: '900010', id_tipo_tempo: 9, tempo_dias: 0},     
            {id_militar_tempo_anterior: 10, matricula_militar: '900011', id_tipo_tempo: 10, tempo_dias: 0},     
            {id_militar_tempo_anterior: 11, matricula_militar: '900012', id_tipo_tempo: 11, tempo_dias: 0},     
            {id_militar_tempo_anterior: 12, matricula_militar: '900013', id_tipo_tempo: 12, tempo_dias: 0},     
            {id_militar_tempo_anterior: 13, matricula_militar: '900014', id_tipo_tempo: 13, tempo_dias: 0},     
            {id_militar_tempo_anterior: 14, matricula_militar: '900015', id_tipo_tempo: 14, tempo_dias: 0},     
            {id_militar_tempo_anterior: 15, matricula_militar: '900016', id_tipo_tempo: 15, tempo_dias: 0},     
     
        ]);
      });
  };
