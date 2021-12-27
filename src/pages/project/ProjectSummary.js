import Avatar from '../../components/Avatar';

const ProjectSummary = ({
  project: { name, dueDate, details, assignedUsersList }
}) => {
  return (
    <div className='project-summary'>
      <h2 className='page-title'>{name}</h2>
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
  );
};

export default ProjectSummary;
