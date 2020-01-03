import { makeExecutableSchema, IExecutableSchemaDefinition } from 'graphql-tools';

import schema from './schemaBuilder';
import User from './users';
import Auth from './authentication';

schema.assign(Auth);
schema.assign(User);

export default makeExecutableSchema(
  // TODO proper typings for schemaBuilder & context
  schema.get() as IExecutableSchemaDefinition<any>,
);
