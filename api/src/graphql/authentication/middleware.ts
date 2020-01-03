import { AuthenticationError, ForbiddenError } from 'apollo-server';
// const createLoaders = require('../dataloaders');

export const withAuth = function (methods) {
  const newMethods = {};
  for (let x in methods) {
    newMethods[x] = function (obj, args, context) {
      if (!context.authScope || !context.authScope.id) {
        throw new AuthenticationError('Authentication required')
      }
      return methods[x](obj, args, context);
    }
  }
  return newMethods;
};

export const withAdminAuth = function (methods) {
  const newMethods = {};
  for (let x in methods) {
    newMethods[x] = function (obj, args, context) {
      if (!context.authScope || !context.authScope.id) {
        throw new AuthenticationError('Authentication required');
      }
      if (!context.authScope.isAdmin) {
        throw new ForbiddenError("You don't have enough permissions to perform this query");
      }
      return methods[x](obj, args, context);
    }
  }
  return newMethods;
};
