import UserConnection from './UserConnection';
import DateTime from '../../common/schema/DateTime';

const User = `
type User {
  id: ID!
  isViewer: Boolean!
  isAdmin: Boolean
  firstName: String
  lastName: String
  email: String
  password: String
  createdAt: DateTime
  updatedAt: DateTime
}
`;
export default {
  User,
  ...UserConnection,
  ...DateTime,
}