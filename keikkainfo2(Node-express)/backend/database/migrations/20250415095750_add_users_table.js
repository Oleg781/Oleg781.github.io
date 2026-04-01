exports.up = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .createTable('users', t => {
            t.increments('user_id').primary();
            t.string('username', 50).notNullable().unique();
            t.string('password', 100).notNullable();
        });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  