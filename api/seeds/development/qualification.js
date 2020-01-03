exports.seed = function(knex) {
  return knex('qualification')
  .truncate()
  .then(() => {
    return knex('qualification')
    .insert([
      { label: 'Driving licence' },
      { label: 'High School Graduation' },
    ]);
  });
};
