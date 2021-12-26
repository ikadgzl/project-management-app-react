import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

const validateThumbnail = (selectedThumbnail) => {
  if (!selectedThumbnail) {
    return 'Please select a thumbnail!';
  }

  if (!selectedThumbnail.type.includes('image')) {
    return 'Please select an image!';
  }

  if (selectedThumbnail.size > 1000000) {
    return 'Image size must be less than 1MB!';
  }

  return null;
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    thumbnail: null
  });
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const userInputHandler = (e) => {
    setUserInfo((prevUserInfo) => {
      if (e.target.name === 'thumbnail') {
        const thumbnail = e.target.files[0];

        setThumbnailError(validateThumbnail(thumbnail));

        return { ...prevUserInfo, thumbnail };
      } else {
        return { ...prevUserInfo, [e.target.name]: e.target.value };
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    signup(userInfo);
  };

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h2>Sign Up!</h2>

      <label>
        <span>E-mail:</span>
        <input
          type='email'
          name='email'
          onChange={userInputHandler}
          value={userInfo.email}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          name='password'
          onChange={userInputHandler}
          value={userInfo.password}
          required
        />
      </label>

      <label>
        <span>Name:</span>
        <input
          type='text'
          name='name'
          onChange={userInputHandler}
          value={userInfo.name}
          required
        />
      </label>

      <label>
        <span>Profile thumbnail:</span>
        <input
          type='file'
          name='thumbnail'
          onChange={userInputHandler}
          required
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>

      <button className='btn' type='submit' disabled={isPending && true}>
        {isPending ? <p>Signing...</p> : <p>Sign Up</p>}{' '}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
