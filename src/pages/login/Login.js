import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const { login, isPending, error } = useLogin();

  const userInputHandler = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    login(userInfo);
  };
  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <h2>Login!</h2>

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

      <button className='btn' type='submit' disabled={isPending && true}>
        {isPending ? <p>Logging...</p> : <p>Login</p>}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
