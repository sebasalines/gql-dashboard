import LoginInput from './LoginInput';
import LoginPayload from './LoginPayload';
import LogoutInput from './LogoutInput';
import LogoutPayload from './LogoutPayload';
import SignupInput from './SignupInput';
import SignupPayload from './SignupPayload';
import RecoverPasswordInput from './RecoverPasswordInput';
import RecoverPasswordPayload from './RecoverPasswordPayload';
import VerifyRecoveryCodeInput from './VerifyRecoveryCodeInput';
import VerifyRecoveryCodePayload from './VerifyRecoveryCodePayload';
import ResetPasswordInput from './ResetPasswordInput';
import ResetPasswordPayload from './ResetPasswordPayload';

export const Mutation = `
  login(input: LoginInput!): LoginPayload!
  signup(input: SignupInput!): SignupPayload!
  logout(input: LogoutInput): LogoutPayload!
  recoverPassword(input: RecoverPasswordInput!): RecoverPasswordPayload!
  verifyRecoveryCode(input: VerifyRecoveryCodeInput!): VerifyRecoveryCodePayload!
  resetPassword(input: ResetPasswordInput!): ResetPasswordPayload!
  `;

export default {
  Mutation,
  ...LoginInput,
  ...LoginPayload,
  ...LogoutInput,
  ...LogoutPayload,
  ...SignupInput,
  ...SignupPayload,
  ...RecoverPasswordInput,
  ...RecoverPasswordPayload,
  ...VerifyRecoveryCodeInput,
  ...VerifyRecoveryCodePayload,
  ...ResetPasswordInput,
  ...ResetPasswordPayload,
}