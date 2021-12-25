import { useEffect, useState } from 'react';
import { LOGIN } from '../context/authReducerTypes';
import { projectAuth, projectStorage } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async ({ name: displayName, email, password, thumbnail }) => {
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

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const photoURL = await img.ref.getDownloadURL();

      await res.user.updateProfile({ displayName, photoURL });

      dispatch({ type: LOGIN, payload: res.user });

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

  return { isPending, error, signup };
};
