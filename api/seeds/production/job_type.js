exports.seed = function(knex) {
  return knex('job_type')
  .truncate()
  .then(() => {
    return knex('job_type').insert([
      { label: 'Basic Construction' },
      { label: 'Beach Cleaning' },
      { label: 'Packing Boxes' },
      { label: 'Serving Meals' },
    ]);
  });
};
