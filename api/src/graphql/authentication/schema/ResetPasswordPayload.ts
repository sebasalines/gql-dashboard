const ResetPasswordPayload = `
type ResetPasswordPayload {
  token: String!
  refreshToken: String!
  viewer: User!
}
`;
export default { ResetPasswordPayload }