exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Lotacao').del()
    //   .then(function () {
    //     // Inserts seed entries
    //     return knex('Lotacao').insert([

            
    //     ]);
    //   });
  };