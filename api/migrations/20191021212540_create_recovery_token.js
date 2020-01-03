exports.up = function(knex) {
  return knex.schema.createTable('recovery_token', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('userId').unsigned();
    t.integer('stage').notNull();
    t.string('token').notNull();
    t.string('code', 8).nullable();
    t.datetime('createdAt').notNull();
    t.datetime('updatedAt').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('recovery_token');
};
