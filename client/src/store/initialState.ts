export interface Viewer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface RootState {
  isAuthenticated: boolean;
  viewer: Viewer | null;
}

const initialState: RootState = {
  isAuthenticated: false,
  viewer: null,
};
export default initialState;
