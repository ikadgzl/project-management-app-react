import { useEffect, useState } from 'react';
import { LOGOUT } from '../context/AuthReducerTypes';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      dispatch({ type: LOGOUT });

      if (!isCancelled) {
        setIsPending(false);
        setError(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, isPending, error };
};
