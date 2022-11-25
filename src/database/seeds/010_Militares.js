exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Militares').del()
    .then(function () {
      // Inserts seed entries
      // tem q adionar a data de aposentadoria de cada um (teoricamente eles foram adicionados e o sistema calculou nessa hr)
      return knex('Militares').insert([
        {
          matricula: 900001, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 99999, id_lotacao: 1,
          dt_ingresso: parseInt(new Date(1990, 01, 01).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 01).getTime() / 1000),
          licencas_esp_acc: 6, id_comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 01).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2002, 07, 06).getTime() / 1000)
        },

        {
          matricula: 900002, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 2, antiguidade: 33, id_lotacao: 2,
          dt_ingresso: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 02).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 07).getTime() / 1000)
        },

        {
          matricula: 900003, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 3, antiguidade: 22, id_lotacao: 3,
          dt_ingresso: parseInt(new Date(1990, 01, 03).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: 3,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 03).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2023, 03, 19).getTime() / 1000)
        },

        {
          matricula: 900004, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 3, antiguidade: 1, id_lotacao: 4,
          dt_ingresso: parseInt(new Date(1990, 01, 04).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 5, id_comportamento: 4,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 04).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 09).getTime() / 1000)
        },

        {
          matricula: 900005, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 21, id_lotacao: 5,
          dt_ingresso: parseInt(new Date(1990, 01, 05).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 05).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 11).getTime() / 1000)
        },

        {
          matricula: 900006, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 23, id_lotacao: 6,
          dt_ingresso: parseInt(new Date(1990, 01, 06).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 06).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2024, 05, 11).getTime() / 1000)
        },

        {
          matricula: 900007, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 11, id_lotacao: 7,
          dt_ingresso: parseInt(new Date(1990, 01, 07).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 07).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 13).getTime() / 1000)
        },

        {
          matricula: 900008, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 48, id_lotacao: 8,
          dt_ingresso: parseInt(new Date(1990, 01, 08).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 1, id_comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 08).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2022, 11, 20).getTime() / 1000)
        },

        {
          matricula: 900009, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 65, id_lotacao: 9,
          dt_ingresso: parseInt(new Date(1990, 01, 09).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 09).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 15).getTime() / 1000)
        },

        {
          matricula: 900010, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 78, id_lotacao: 10,
          dt_ingresso: parseInt(new Date(1990, 01, 10).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 10).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 16).getTime() / 1000)
        },

        {
          matricula: 900011, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 95, id_lotacao: 11,
          dt_ingresso: parseInt(new Date(1990, 01, 11).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: 3, id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 11).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 18).getTime() / 1000)
        },

        {
          matricula: 900012, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 1, id_lotacao: 12,
          dt_ingresso: parseInt(new Date(1990, 01, 12).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 12).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 19).getTime() / 1000)
        },

        {
          matricula: 900013, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 23, id_lotacao: 13,
          dt_ingresso: parseInt(new Date(1990, 01, 13).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 13).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 20).getTime() / 1000)
        },

        {
          matricula: 900014, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 21, id_lotacao: 14,
          dt_ingresso: parseInt(new Date(1990, 01, 14).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: 1,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 14).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 21).getTime() / 1000)
        },

        {
          matricula: 900015, nome: 'Joaquim Alves da Silva Xavier',
          sexo: 'Masculino', posto: 1, antiguidade: 84, id_lotacao: 15,
          dt_ingresso: parseInt(new Date(1990, 01, 15).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: 2,
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 15).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 22).getTime() / 1000)
        },

        {
          matricula: 900016, nome: 'Anita Garibaldi',
          sexo: 'Feminino', posto: 1, antiguidade: 22, id_lotacao: 16,
          dt_ingresso: parseInt(new Date(1990, 01, 16).getTime() / 1000),
          dt_nascimento: parseInt(new Date(1980, 01, 02).getTime() / 1000),
          licencas_esp_acc: '', id_comportamento: '',
          endereco: 'Avenida Engenheiro Mesquita, 586, Centro, Araranguá/SC',
          ferias: parseInt(new Date(2022, 01, 16).getTime() / 1000),
          dt_aposentadoria: parseInt(new Date(2025, 07, 23).getTime() / 1000)
        }

      ]);
    });
};