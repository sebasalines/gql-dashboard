const LogoutPayload = `
type LogoutPayload {
  success: Boolean!
  token: String
  refreshToken: String
}
`;

export default {
  LogoutPayload,
}