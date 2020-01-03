import Cursor from './cursor';

export default function (nodes = [], limit, orderField, hasNextPage = false) {
  // let hasNextPage = false;
  // if (nodes.length > limit) {
  //   nodes.pop();
  //   hasNextPage = true;
  // }
  return {
    endCursor: nodes.length ? Cursor.cursorEncode(nodes[nodes.length - 1][orderField]) : null,
    hasNextPage,
    hasPreviousPage: false,
    startCursor: nodes.length ? Cursor.cursorEncode(nodes[0][orderField]) : null,
  };
};
