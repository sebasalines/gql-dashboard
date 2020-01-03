import resolvers from './resolvers';
import Query from './schema/Query';
import Mutation from './schema/Mutation';

export default {
  typeDefs: {
    ...Query,
    ...Mutation,
  },
  resolvers,
};
