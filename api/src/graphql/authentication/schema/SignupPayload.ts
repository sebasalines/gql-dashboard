const SignupPayload = `
type SignupPayload {
  token: String!
  refreshToken: String!
  viewer: User!
}
`;
export default { SignupPayload }