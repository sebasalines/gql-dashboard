import { ApolloServer, AuthenticationError } from 'apollo-server';

import schema from './graphql/executableSchema';
import userToken from './graphql/authentication/UserToken';
import createLoaders from './graphql/dataloaders';

const server = new ApolloServer({
  schema,
  // resolverValidationOptions: {
  //   requireResolversForResolveType: false
  // },
  // debug: true,
  cors: {
    origin: 'http://localhost:4200',			// <- allow request from all domains
    credentials: true,
  },
  context: async ({ req, res, connection }) => {
    let authorization;
    let ctx;
    if (connection) {
      ctx = connection.context;
    } else {
      ctx = {
        authScope: {},
        remoteAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        res,
      };

      // FIXME
      let logBearer = false;
      if (req.body.operationName && req.body.operationName !== 'IntrospectionQuery') {
        logBearer = true;
        // console.log('OperationName: %s', req.body.operationName);
        if (req.headers) {
          // console.log(`Headers: ${JSON.stringify(req.headers)}`);
        }
        if (req.body.query) {
          // console.log('query:\n%s', req.body.query.replace('\\n', '\n'));
        }
        if (req.body.variables) {
          // console.log('variables:');
          // console.log(JSON.stringify(req.body.variables, null, 2));
        }
      }


      authorization = req.headers.authorization;// || req.cookies.token;
      if (authorization) {
        // FIXME
        // if (logBearer) {
        //   console.log(authorization);
        // }

        const token = authorization.replace(/^Bearer /, '');
        try {
          const authScope: any = await userToken.verify(token);
          ctx.token = token;
          ctx.authScope = {
            id: parseInt(authScope.sub),
            isAdmin: !!(authScope.isAdmin),
            type: authScope.type,
          };
        } catch (err) {
          console.error(err);
          throw new AuthenticationError('Invalid token');
        }
      }
    }
    // const args = {
    //   userId: ctx.authScope.id || null,
    //   isAdmin: !!(ctx.authScope.isAdmin),
    // };
    ctx.loaders = createLoaders(ctx.authScope);
    return ctx;
  }
});

server.listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
