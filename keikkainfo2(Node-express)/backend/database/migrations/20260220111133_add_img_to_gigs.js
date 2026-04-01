exports.up = function(knex) {
    return knex.schema.table('gigs', function(table) {
      table.string('img').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('gigs', function(table) {
      table.dropColumn('img');
    });
  };
  