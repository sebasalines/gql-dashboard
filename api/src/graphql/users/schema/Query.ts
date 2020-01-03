const Query = `
  viewer: User!
  users(
    after: String
    first: Int
  ): UserConnection!
`;
export default {
  Query,
}