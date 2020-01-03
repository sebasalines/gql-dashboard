import UserEdge from './UserEdge';
import User from './User';
import PageInfo from '../../common/schema/PageInfo';

const UserConnection = `
type UserConnection {
  edges: [UserEdge]
  nodes: [User]
  pageInfo: PageInfo!
  totalCount: Int!
}
`;
export default {
  UserConnection,
  ...UserEdge,
  ...User,
  ...PageInfo,
}
