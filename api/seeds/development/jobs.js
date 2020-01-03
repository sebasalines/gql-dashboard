const faker = require('faker');

const Job = require('../../src/graphql/jobs/Job');

const jobsCount = 30;

exports.seed = function(knex) {
  return knex('user').select('id')
  .where('type', 1)
  .then(data => {
    const employerIds = data.map(({ id }) => id);
    const types = [
      [ 'Basic Construction', 'https://staging-socialwyze.s3-us-west-1.amazonaws.com/jobs/work2.jpg' ],
      [ 'Beach Cleaning', 'https://staging-socialwyze.s3-us-west-1.amazonaws.com/jobs/work4.jpg' ],
      [ 'Packing Boxes', 'https://staging-socialwyze.s3-us-west-1.amazonaws.com/jobs/work1.jpg' ],
      [ 'Serving Meals', 'https://staging-socialwyze.s3-us-west-1.amazonaws.com/jobs/work3.jpg' ],
    ];

    const getRandomWage = ((min, max) => Math.floor(Math.random() * (max - min) + min)).bind(null, 7, 19);

    return knex('job')
    .truncate()
    .then(() => {
      let inserts = [];
      for (let i = 0; i < jobsCount; i++) {
        let address = faker.address;
        let lng = address.longitude();
        let lat = address.latitude();

        let type = types[Math.floor(Math.random() * types.length)]

        // inserts.push({
        inserts.push(Job.query()
          .insert({
            employerId: employerIds[Math.floor(Math.random() * employerIds.length)],
            wage: getRandomWage(),
            title: type[0],
            photo: type[1],
            summary: faker.lorem.paragraphs(),
            place: `${address.streetName()}`,
            geolocation: knex.raw('ST_MakePoint(?, ?)', [lng, lat]),
            lat,
            lng,
            organizationId: 1,
            dateSince: faker.date.recent(),
            dateUntil: faker.date.future(),
            data: {
              startTime: `0${Math.random() > 0.5 ? '8' : '9'}:${Math.random() > 0.7 ? '3' : '0'}0`,
              endingTime: `${Math.random() > 0.5 ? '16' : '17'}:${Math.random() > 0.7 ? '3' : '0'}0`,
              weekDays: [ 0, 1, 2, 3, 4, 5, 6 ].filter(i => Math.random() > 0.5),
            },
          })
        );
      }
      return Promise.all(inserts);
      // return knex('job').insert(inserts);
    });
  })
};
