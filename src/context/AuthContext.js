import { createContext, useEffect, useReducer } from 'react';

import { AUTH_IS_READY, LOGIN, LOGOUT } from './AuthReducerTypes';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };

    default:
      return state;
  }
};

const INITIAL_STATE = {
  user: null,
  authIsReady: null
};

export const AuthContextProdiver = ({ children }) => {
  const [state, dispact] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispact({ type: AUTH_IS_READY, payload: user });
    });

    unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispact }}>
      {children}
    </AuthContext.Provider>
  );
};
