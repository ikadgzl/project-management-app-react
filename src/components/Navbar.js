import './Navbar.css';

import Temple from '../assets/temple.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='project management app logo' />
          <span>The PM App</span>
        </li>

        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
