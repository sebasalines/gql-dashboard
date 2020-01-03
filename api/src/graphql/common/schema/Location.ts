import LatLng from './LatLng';

const Location = `
type Location {
  label: String!
  lat: LatLng!
  lng: LatLng!
}
`;

export default {
  Location,
  ...LatLng
};
