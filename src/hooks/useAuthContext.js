import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const context = useContext();

  if (!context) {
    throw Error('Something wrong with useAuthContext');
  }

  return context;
};
