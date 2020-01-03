import User from './User';

export const UploadAvatarPayload = `
type UploadAvatarPayload {
  viewer: User!
}
`;
export default {
  UploadAvatarPayload,
  ...User,
};

