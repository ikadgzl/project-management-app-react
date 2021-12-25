import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import './OnlineUsers.css';

const OnlineUsers = () => {
  const { documents, error } = useCollection('users');

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <p>{error}</p>}
      {documents &&
        documents.map(({ id, online, displayName, photoURL }) => (
          <div key={id} className='user-list-item'>
            {online && <span className='online-user' />}
            <span>{displayName}</span>
            <Avatar src={photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
