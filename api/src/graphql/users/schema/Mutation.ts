import UpdateProfileInput from './UpdateProfileInput';
import UpdateProfilePayload from './UpdateProfilePayload';
import UploadAvatarPayload from './UploadAvatarPayload';
import Upload from '../../common/schema/Upload';

const Mutation = `
updateProfile(input: UpdateProfileInput!): UpdateProfilePayload!
uploadAvatar(file: Upload!): UploadAvatarPayload!
`;
export default {
  Mutation,
  ...UpdateProfileInput,
  ...UpdateProfilePayload,
  ...UploadAvatarPayload,
  ...Upload,
};
