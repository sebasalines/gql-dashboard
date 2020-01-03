// const { UserInputError } = require('apollo-server');

const withPagedResults = (fun, orderField = { ID: 'id' }) => {
  return (obj, args, context, info) => {
    const { page = 1, pageSize = 25, orderBy = {} } = args;
    const { field = Object.keys(orderField)[0], direction = 'ASC' } = orderBy;
    const stmt = fun(obj, args, context, info);
    if (!stmt) {
      return stmt;
    }
    return stmt
    .orderBy(orderField[field], direction)
    .page(page - 1, pageSize)
    .then(({ results, total }) => {
      return {
        nodes: results,
        page,
        pageSize,
        totalCount: total,
      };
    });
  };
};

export default withPagedResults;
