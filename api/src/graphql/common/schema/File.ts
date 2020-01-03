import URI from './URI';

const File = `
type File {
  url: URI!
  mimetype: String!
  encoding: String!
}
`;

export default {
  File,
  ...URI,
};
