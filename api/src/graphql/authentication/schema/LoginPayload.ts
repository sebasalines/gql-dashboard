import User from '../../users/schema/User';

const LoginPayload = `
type LoginPayload {
  token: String!
  refreshToken: String!
  viewer: User!
}
`;
export default {
  LoginPayload,
  ...User,
}