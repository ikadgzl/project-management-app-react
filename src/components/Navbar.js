import './Navbar.css';

import Temple from '../assets/temple.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='project management app logo' />
          <span>The PM App</span>
        </li>

        {!user ? (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <button
              className='btn'
              onClick={logoutHandler}
              disabled={isPending && true}
            >
              {isPending ? 'Logging out..' : 'Logout'}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
