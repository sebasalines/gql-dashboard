export default (function () {
  const typeDefs = {};
  let QueryType = [];
  let MutationType = [];
  let SubscriptionType = [];
  let resolvers = {
    Query: {},
    Mutation: {},
    // Subscription: {},
  };
  return {
    assign: m => {
      const query = resolvers.Query || {};
      const mutation = resolvers.Mutation || {};
      // const subscription = resolvers.Subscription || {};
      if (m.resolvers) {
        Object.assign(resolvers, m.resolvers);
        Object.assign(resolvers.Query, query, m.resolvers.Query);
        Object.assign(resolvers.Mutation, mutation, m.resolvers.Mutation);
        // Object.assign(resolvers.Subscription, subscription, m.resolvers.Subscription);
      }
      if (m.typeDefs) {
        Object.assign(typeDefs, Object.keys(m.typeDefs).reduce((acc, key) => {
          if (!['Query', 'Mutation'].includes(key)) {
            acc[key] = m.typeDefs[key];
          }
          return acc;
        }, {}));
        if (m.typeDefs.Query) {
          QueryType.push(m.typeDefs.Query);
        }
        if (m.typeDefs.Mutation) {
          MutationType.push(m.typeDefs.Mutation);
        }
        if (m.typeDefs.Subscription) {
          SubscriptionType.push(m.typeDefs.Subscription);
        }
      }
    },
    get: () => {
      return {
        resolvers,
        typeDefs: Object.values(typeDefs).concat([`
"""
The query root of GraphQL interface.
"""
type Query {
${QueryType.join('\n')}
}

"""
The root query for implementing GraphQL mutations.
"""
type Mutation {
${MutationType.join('\n')}
}
        `]),
      };
    }
  };
})();


// type Subscription {
//   ${SubscriptionType.join('\n')}
//   }
