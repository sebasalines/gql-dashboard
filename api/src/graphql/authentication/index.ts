import Mutation from './schema/Mutation';
import resolvers from './resolvers';

export default {
  typeDefs: {
    ...Mutation,
  },
  resolvers,
};
