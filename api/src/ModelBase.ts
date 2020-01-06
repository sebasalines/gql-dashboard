import { Model } from 'objection';
import Knex from 'knex';
import toMysqlFormat from './lib/toMysqlFormat';

const config = require('../knexfile');
console.log({config});
const knex = Knex(config[process.env.NODE_ENV]);

Model.knex(knex);

// @ts-ignore
class ModelBase extends Model  {
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    // @ts-ignore
    if (this.constructor.timestampable) {
      // @ts-ignore
      this.createdAt = toMysqlFormat();
    }
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    // @ts-ignore
    if (this.constructor.timestampable) {
      // @ts-ignore
      this.updatedAt = toMysqlFormat();
    }
  }
}

export default ModelBase;
