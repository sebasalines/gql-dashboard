import React, { createContext, useContext, useReducer, Reducer, Dispatch } from 'react';
import initialState, { RootState } from './initialState';
import reducer from './reducer';

export interface StoreAction {
  type: string;
  payload?: any;
};
export const StoreContext = createContext<{ state: RootState, dispatch: Dispatch<StoreAction> }>({ state: initialState, dispatch: null });

export const StoreProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStateValue = () => useContext(StoreContext);