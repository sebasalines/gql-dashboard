import gql from 'graphql-tag';

export type LoginPayload = {
  login: {
    token: string;
    viewer: { id: string };
  };
};
export const logIn = gql`
mutation LogIn($input: LoginInput!) {
  login(input: $input) {
    token
    viewer {
      id
      email
      firstName
      lastName
    }
  }
}
`;