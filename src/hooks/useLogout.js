import { useEffect, useState } from 'react';
import { LOGOUT } from '../context/authReducerTypes';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = user;

      await projectFirestore
        .collection('users')
        .doc(uid)
        .update({ online: false });
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
