import { StoreAction } from './index';
import { RootState } from "./initialState";

export default function (state: RootState, action: StoreAction): RootState {
  switch (action.type) {
    case 'setViewer': {
      const viewer = action.payload.viewer;
      return {
        ...state,
        viewer,
        isAuthenticated: !!viewer,
      };
    };
    default:
      return state;
  };
}