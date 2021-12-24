import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { LOGIN } from '../context/AuthReducerTypes';
import { projectAuth } from '../firebase/config';

export const useLogin = () => {
  const [isCancelled, setIsCanceller] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword();

      dispatch({ type: LOGIN, payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
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

  return { login, isPending, error };
};
