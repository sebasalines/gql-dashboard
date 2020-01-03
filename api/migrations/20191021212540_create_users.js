exports.up = function(knex) {
  return knex.schema.createTable('user', function(t) {
    t.increments('id').unsigned().primary();
    t.string('email').unique().notNull();
    t.string('firstName').notNull();
    t.string('lastName').notNull();
    t.string('password').notNull();
    t.boolean('isAdmin').notNull();
    t.datetime('createdAt').notNull();
    t.datetime('updatedAt').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
