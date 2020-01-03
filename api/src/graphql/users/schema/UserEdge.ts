import User from './User';

const UserEdge = `
type UserEdge {
  cursor: String!
  node: User
}
`;
export default {
  UserEdge,
  ...User,
};
