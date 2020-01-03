import User from './User';

const UpdateProfilePayload = `
type UpdateProfilePayload {
  viewer: User!
}
`;
export default {
  UpdateProfilePayload,
  ...User,
};