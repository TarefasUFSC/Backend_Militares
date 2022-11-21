exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Militares').del()
    .then(function () {
      // Inserts seed entries
      return knex('Militares').insert([
        {
          matricula: 900001, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 99999, lotacao: 1,
          dt_ingresso: parseInt(new Date(1990, 01, 01).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 01).getTime() / 1000),
          licencas_esp_acc: 6, comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 01).getTime() / 1000)
        },

        {
          matricula: 900002, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 2, antiguidade: 33, lotacao: 2,
          dt_ingresso: parseInt(new Date(1980, 01, 02).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 02).getTime() / 1000)
        },

        {
          matricula: 900003, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 3, antiguidade: 22, lotacao: 3,
          dt_ingresso: parseInt(new Date(1990, 01, 03).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: 3,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 03).getTime() / 1000)
        },

        {
          matricula: 900004, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 3, antiguidade: 1, lotacao: 4,
          dt_ingresso: parseInt(new Date(1990, 01, 04).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 5, comportamento: 4,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 04).getTime() / 1000)
        },

        {
          matricula: 900005, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 21, lotacao: 5,
          dt_ingresso: parseInt(new Date(1990, 01, 05).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 05).getTime() / 1000)
        },

        {
          matricula: 900006, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 23, lotacao: 6,
          dt_ingresso: parseInt(new Date(1990, 01, 06).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 06).getTime() / 1000)
        },

        {
          matricula: 900007, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 11, lotacao: 7,
          dt_ingresso: parseInt(new Date(1990, 01, 07).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 07).getTime() / 1000)
        },

        {
          matricula: 900008, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 48, lotacao: 8,
          dt_ingresso: parseInt(new Date(1990, 01, 08).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 1, comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 08).getTime() / 1000)
        },

        {
          matricula: 900009, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 65, lotacao: 9,
          dt_ingresso: parseInt(new Date(1990, 01, 09).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 09).getTime() / 1000)
        },

        {
          matricula: 900010, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 78, lotacao: 10,
          dt_ingresso: parseInt(new Date(1990, 01, 10).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 10).getTime() / 1000)
        },

        {
          matricula: 900011, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 95, lotacao: 11,
          dt_ingresso: parseInt(new Date(1990, 01, 11).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 3, comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 11).getTime() / 1000)
        },

        {
          matricula: 900012, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 1, lotacao: 12,
          dt_ingresso: parseInt(new Date(1990, 01, 12).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 12).getTime() / 1000)
        },

        {
          matricula: 900013, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 23, lotacao: 13,
          dt_ingresso: parseInt(new Date(1990, 01, 13).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 13).getTime() / 1000)
        },

        {
          matricula: 900014, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 21, lotacao: 14,
          dt_ingresso: parseInt(new Date(1990, 01, 14).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 14).getTime() / 1000)
        },

        {
          matricula: 900015, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'M', posto: 1, antiguidade: 84, lotacao: 15,
          dt_ingresso: parseInt(new Date(1990, 01, 15).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 15).getTime() / 1000)
        },

        {
          matricula: 900016, nome: 'Anita Garibaldi',
          sexo: 'F', posto: 1, antiguidade: 22, lotacao: 16,
          dt_ingresso: parseInt(new Date(1990, 01, 16).getTime() / 1000), dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 16).getTime() / 1000)
        }

      ]);
    });
};