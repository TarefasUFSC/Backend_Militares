exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Cidade').del()
      .then(function () {
        // Inserts seed entries
        // temos que colocar o lat lng dessas cidades
        return knex('Cidade').insert([  
            {id_cidade: 1,nm_cidade:"Itajaí", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 2,nm_cidade:"Chapecó", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 3,nm_cidade:"Canoinhas", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 4,nm_cidade:"Florianópolis", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 5,nm_cidade:"Tubarão", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 6,nm_cidade:"Lages", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 7,nm_cidade:"São José", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 8,nm_cidade:"Joinville", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 9,nm_cidade:"Criciúma", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 10,nm_cidade:"Blumenau", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 11,nm_cidade:"São Miguel do Oeste", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 12,nm_cidade:"Balneário Camboriú", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 13,nm_cidade:"Rio do Sul", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 14,nm_cidade:"Jaraguá do Sul", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 15,nm_cidade:"Caçador", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 16,nm_cidade:"Palhoça", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 17,nm_cidade:"Joinville", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 18,nm_cidade:"Brusque", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 19,nm_cidade:"Araranguá", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 20,nm_cidade:"Concórdia", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 21,nm_cidade:"Florianópolis", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 22,nm_cidade:"Florianópolis", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 23,nm_cidade:"São Bento do Sul", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 24,nm_cidade:"Biguaçu", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 25,nm_cidade:"Navegantes", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 26,nm_cidade:"Herval d'Oeste", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 27,nm_cidade:"São Francisco do Sul", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 28,nm_cidade:"Laguna", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 29,nm_cidade:"Içara", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 30,nm_cidade:"Xanxerê", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 31,nm_cidade:"Itapema", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 32,nm_cidade:"Indaial", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 33,nm_cidade:"Curitibanos", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 34,nm_cidade:"Imbituba", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 35,nm_cidade:"Braço do Norte", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 36,nm_cidade:"Dionísio Cerqueira", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 37,nm_cidade:"Santo Amaro da Imperatriz", lat_cidade: 0, lng_cidade:0 },
            {id_cidade: 38,nm_cidade:"Mafra", lat_cidade: 0, lng_cidade:0 }
        ]);
      });
  };