const faker = require('faker');

const usersCount = 30;

exports.seed = function(knex) {
  return knex('user')
  .truncate()
  .then(function () {
    // demo1234
    const password = '$2b$08$6PL3GXFH7cVI/IVS.m/Oweiq8bA66sOYsvTW3H.gji/cdF7cztibK';
    let inserts = [];
    for (let i = 1; i < usersCount; i++) {
      inserts.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: `demo${i}@example.net`,
        password,
        createdAt: parseInt((new Date(faker.date.recent())).getTime() / 1000),
      });
    }
    return knex('user').insert(inserts);
  });
};
