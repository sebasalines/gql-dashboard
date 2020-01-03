import Result from '../../common/schema/Result';

const VerifyRecoveryCodePayload = `
type VerifyRecoveryCodePayload {
  result: Result!
  resetToken: String
}
`;
export default {
  VerifyRecoveryCodePayload,
  ...Result,
}