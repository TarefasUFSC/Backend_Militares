exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Lotacao').del()
      .then(function () {
    //     // Inserts seed entries
        return knex('Lotacao').insert([
          {id_lotacao: 1, id_regiao: 1, id_batalhao: 1, id_companhia: 1, id_pelotao: 1,id_grupo: 1, id_cidade: 19},
          {id_lotacao: 2, id_regiao: 2, id_batalhao: 2, id_companhia: 2, id_pelotao: 2,id_grupo: 2, id_cidade: 39},
          {id_lotacao: 3, id_regiao: 3, id_batalhao: 3, id_companhia: 3, id_pelotao: 3,id_grupo: 3, id_cidade: 40},
          {id_lotacao: 4, id_regiao: 4, id_batalhao: 4, id_companhia: 4, id_pelotao: 4,id_grupo: 4, id_cidade: 41},
          {id_lotacao: 5, id_regiao: 5, id_batalhao: 5, id_companhia: 5, id_pelotao: 5,id_grupo: 5, id_cidade: 42},
          {id_lotacao: 6, id_regiao: 6, id_batalhao: 6, id_companhia: 6, id_pelotao: 6,id_grupo: 6, id_cidade: 19},
          {id_lotacao: 7, id_regiao: 7, id_batalhao: 7, id_companhia: 7, id_pelotao: 7,id_grupo: 7, id_cidade: 39},
          {id_lotacao: 8, id_regiao: 8, id_batalhao: 8, id_companhia: 8, id_pelotao: 8,id_grupo: 8, id_cidade: 40},
          {id_lotacao: 9, id_regiao: 9, id_batalhao: 9, id_companhia: 9, id_pelotao: 9,id_grupo: 9, id_cidade: 41},
          {id_lotacao: 10, id_regiao: 10, id_batalhao: 10, id_companhia: 10, id_pelotao: 10,id_grupo: 10, id_cidade: 42},
          {id_lotacao: 11, id_regiao: 11, id_batalhao: 11, id_companhia: 11, id_pelotao: 11,id_grupo: 11, id_cidade: 19},
          {id_lotacao: 12, id_regiao: 12, id_batalhao: 12, id_companhia: 12, id_pelotao: 12,id_grupo: 12, id_cidade: 39},
          {id_lotacao: 13, id_regiao: 13, id_batalhao: 13, id_companhia: 13, id_pelotao: 13,id_grupo: 13, id_cidade: 40},
          {id_lotacao: 14, id_regiao: 14, id_batalhao: 14, id_companhia: 14, id_pelotao: 14,id_grupo: 14, id_cidade: 41},
          {id_lotacao: 15, id_regiao: 15, id_batalhao: 15, id_companhia: 15, id_pelotao: 15,id_grupo: 15, id_cidade: 42},
          {id_lotacao: 16, id_regiao: 16, id_batalhao: 16, id_companhia: 16, id_pelotao: 16,id_grupo: 16, id_cidade: 43},

            
        ]);
       });
  };