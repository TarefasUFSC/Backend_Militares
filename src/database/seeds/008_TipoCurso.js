exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('TipoCurso').del()
      .then(function () {
        // Inserts seed entries
        return knex('TipoCurso').insert([  
            {id_tipo_curso:0,nm_tipo_curso:"Formação"},
            {id_tipo_curso:1,nm_tipo_curso:"Curso de Formação"},
            {id_tipo_curso:2,nm_tipo_curso:"PM"},
            {id_tipo_curso:3,nm_tipo_curso:"Civis"}
        ]);
      });
  };