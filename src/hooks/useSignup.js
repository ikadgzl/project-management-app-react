import { useEffect, useState } from 'react';
import { LOGIN } from '../context/AuthReducerTypes';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async ({ name: displayName, email, password }) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('could not complete signup');
      }

      await res.user.updateProfile({ displayName });

      dispatch({ type: LOGIN, payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(false);
      }
    } catch (error) {
      console.log(error.message);

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

  return { isPending, error, signup };
};
