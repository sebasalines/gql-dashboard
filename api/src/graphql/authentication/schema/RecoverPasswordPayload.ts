import RecoverPasswordStatus from './RecoverPasswordStatus'
const RecoverPasswordPayload = `
type RecoverPasswordPayload {
  code: Int
  status: RecoverPasswordStatus
  recoveryToken: String
  recipient: String
}
`;
export default {
  RecoverPasswordPayload,
  ...RecoverPasswordStatus,
}