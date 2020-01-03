// Update with your config settings.
const connection = {
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
module.exports = {

  development: {
    client: "postgresql",
    connection,
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true,
  },

  staging: {
    client: "postgresql",
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
