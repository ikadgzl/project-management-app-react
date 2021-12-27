import { Link } from 'react-router-dom';
import Avatar from './Avatar';

import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className='project-list'>
      {projects.length === 0 ? (
        <p>No projects yet!</p>
      ) : (
        projects.map(({ id, name, dueDate, assignedUsersList }) => (
          <Link to={`/projects/${id}`} key={id}>
            <h4>{name}</h4>
            <p>Due by {dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
              <ul>
                {assignedUsersList.map(({ id, photoURL }) => (
                  <li key={id}>
                    <Avatar src={photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProjectList;
