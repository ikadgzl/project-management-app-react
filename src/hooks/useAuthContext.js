import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('Something wrong with useAuthContext');
  }

  return context;
};
