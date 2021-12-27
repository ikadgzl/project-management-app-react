import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

const ProjectSummary = ({
  project: { id, name, dueDate, details, assignedUsersList, createdBy }
}) => {
  const navigate = useNavigate();
  const { deleteDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();

  const deleteProjectHandler = (e) => {
    deleteDocument(id);

    navigate('/');
  };

  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{name}</h2>
        <p>By {createdBy.displayName}</p>
        <p className='due-date'>
          Project due by {dueDate.toDate().toDateString()}{' '}
        </p>
        <p className='details'>{details}</p>
        <h4>Project is assigned to:</h4>
        <div className='assigned-users'>
          {assignedUsersList.map(({ id, photoURL }) => (
            <div key={id}>
              <Avatar src={photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === createdBy.id && (
        <button
          className='btn'
          onClick={deleteProjectHandler}
          disabled={response.isPending && true}
        >
          {!response.isPending ? 'Mark as Complete' : 'Marking...'}
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
