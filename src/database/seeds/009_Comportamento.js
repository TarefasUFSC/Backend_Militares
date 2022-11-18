exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Comportamento').del()
      .then(function () {
        // Inserts seed entries
        return knex('Comportamento').insert([
          
            
        ]);
      });
  };