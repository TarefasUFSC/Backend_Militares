exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Curso').del()
      .then(function () {
        // Inserts seed entries
        // temos que colocar o lat lng dessas cidades
        return knex('Curso').insert([  
            {id_curso:0,nm_curso:"CFSD",id_tipo_curso:1},
            {id_curso:1,nm_curso:"CHC",id_tipo_curso:1},
            {id_curso:2,nm_curso:"CFS",id_tipo_curso:1},
            {id_curso:3,nm_curso:"CAS",id_tipo_curso:1},
            {id_curso:4,nm_curso:"CFO",id_tipo_curso:1},
            {id_curso:5,nm_curso:"CAO",id_tipo_curso:1},
            {id_curso:6,nm_curso:"CSPM",id_tipo_curso:1},
            {id_curso:7,nm_curso:"Direito",id_tipo_curso:0},
            {id_curso:8,nm_curso:"Sociologia",id_tipo_curso:0},
            {id_curso:9,nm_curso:"Filosofia",id_tipo_curso:0},
            {id_curso:10,nm_curso:"Ciência da Computação",id_tipo_curso:0},
            {id_curso:11,nm_curso:"Táticas Policiais",id_tipo_curso:2},
            {id_curso:12,nm_curso:"PROERD",id_tipo_curso:2},
            {id_curso:13,nm_curso:"Operações Especiais",id_tipo_curso:2},
            {id_curso:14,nm_curso:"Operações de Choque",id_tipo_curso:2},
            {id_curso:15,nm_curso:"Polícia Comunitária",id_tipo_curso:2},
            {id_curso:16,nm_curso:"Instrutor de Tiro",id_tipo_curso:2},
            {id_curso:17,nm_curso:"Koban",id_tipo_curso:2},
            {id_curso:18,nm_curso:"Libras",id_tipo_curso:3},
            {id_curso:19,nm_curso:"Letras",id_tipo_curso:3},
            {id_curso:20,nm_curso:"Técnico em Informática",id_tipo_curso:3},
            {id_curso:21,nm_curso:"Técnico em Enfermagem",id_tipo_curso:3},
            {id_curso:22,nm_curso:"Mestrado em Direito",id_tipo_curso:3},
            {id_curso:23,nm_curso:"Doutorado em Direito",id_tipo_curso:3},
            {id_curso:24,nm_curso:"Economia",id_tipo_curso:3},
            {id_curso:25,nm_curso:"Mestrado em Engenharia do Conhecimento",id_tipo_curso:3}
        ]);
      });
  };