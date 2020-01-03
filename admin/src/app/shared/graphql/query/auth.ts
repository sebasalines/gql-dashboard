import gql from 'graphql-tag';

export type ViewerPayload = {
  viewer: {
    id: string;
    firstName: string;
    lastName: string;
  };
};
export const getViewer = gql`
query GetViewer {
  viewer {
    id
    firstName
    lastName
  }
}
`;