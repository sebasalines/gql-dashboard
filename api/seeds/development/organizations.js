const faker = require('faker');

exports.seed = async (knex) => {
  const owner = knex('user')
  .where('type', 1)
  .first();
  return knex('organization')
  .truncate()
  .then(() => {
    return knex('organization').insert([
      {
        name: 'Hawaii Ocean Ambassadors',
        picture: 'https://staging-socialwyze.s3-us-west-1.amazonaws.com/organizations/mdDuranBLrkhoyvt4UUnsplashCopy%402x.jpg',
        location: 'Honolulu, HI',
        email: 'HOA@gmail.com',
        phoneNumber: '00 777 666 555',
        createdAt: faker.date.recent(),
        ownerId: owner.id,
      },
    ]);
  });
};
