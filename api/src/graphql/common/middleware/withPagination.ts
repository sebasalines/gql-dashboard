import { UserInputError } from 'apollo-server';

import PageInfo from '../PageInfo';
import Cursor from '../cursor';

const withPagination = (fun, connectionName, _module, orderField = { ID: 'id'}) => {
  if (_module && connectionName) {
    // const nodes = (obj) => {
    //   const { nodes, stmt, args: { after, first, orderBy = {} }} = obj;
    //   if (nodes) {
    //     return nodes;
    //   }
    //   if (!first) {
    //     throw new UserInputError('MISSING_PAGINATION_BOUNDARIES');
    //   }
    //   const cursor = Cursor.cursorDecode(after);
    //   const { field = Object.keys(orderField)[0], direction = 'ASC' } = orderBy;
    //   return stmt.clone()
    //   .where(orderField[field], (direction === 'ASC' ? '>' : '<'), cursor)
    //   .orderBy(orderField[field], direction)
    //   .limit(first + 1);
    // };
    _module.exports[connectionName] = {
      nodes: (obj) => {
        const { nodes } = obj;
        if (nodes === false) {
          throw new UserInputError('MISSING_PAGINATION_BOUNDARIES');
        }
        return nodes;
      },
      edges: (obj) => {
        const { nodes, args } = obj;
        const orderBy = args && args.hasOwnProperty('orderBy') ? args.orderBy : {};

        if (nodes === false) {
          throw new UserInputError('MISSING_PAGINATION_BOUNDARIES');
        }
        const { field = Object.keys(orderField)[0] } = orderBy;
        return nodes.map(node => ({
          cursor: Cursor.cursorEncode(node[orderField[field]]),
          node,
        }));
      },
      totalCount: (obj) => {
        const { countStmt } = obj;
        return countStmt;
      },
      pageInfo: (obj) => {
        const { nodes, hasNextPage, args: { first, orderBy = {} }} = obj;
        if (nodes === false) {
          throw new UserInputError('MISSING_PAGINATION_BOUNDARIES');
        }
        const { field = Object.keys(orderField)[0] } = orderBy;
        return PageInfo(nodes, first, orderField[field], hasNextPage);
      },
    };
  }
  return (obj, args, context, info) => {
    const { after, before, first, last, orderBy = {} } = args;
    const { field = Object.keys(orderField)[0], direction = 'ASC' } = orderBy;
    const stmt = fun(obj, args, context, info);
    if (!stmt) {
      return stmt;
    }
    if (first && last) {
      throw new UserInputError('Passing both `first` and `last` to paginate the `repositories` connection is not supported.');
    }
    // FIXME https://vincit.github.io/objection.js/api/query-builder/other-methods.html#resultsize
    const countStmt = stmt.clone().clearSelect().count().first().pluck('count');
    if (!first && !last) {
      return {
        countStmt,
        nodes: false,
      };
    }
    const limit = first || last;
    if (before) {
      const cursor = Cursor.cursorDecode(before)
      stmt.where(orderField[field], (direction === 'ASC' ? '<' : '>'), cursor);
    }
    if (after) {
      const cursor = Cursor.cursorDecode(after)
      stmt.where(orderField[field], (direction === 'ASC' ? '>' : '<'), cursor);
    }
    return stmt
    .orderBy(orderField[field], direction)
    .limit(limit + 1)
    .then(nodes => {
      let hasNextPage = false;
      if (nodes.length > limit) {
        nodes.pop();
        hasNextPage = true;
      }
      return {
        nodes,
        args,
        countStmt,
        hasNextPage,
      };
    });
  };
};

export default withPagination;
