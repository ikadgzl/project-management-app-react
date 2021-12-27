import './Dashboard.css';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState('all');

  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects');

  console.log(documents);

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const projects = documents
    ? documents.filter((doc) => {
        switch (currentFilter) {
          case 'all':
            return true;

          case 'mine':
            return doc.assignedUsersList.find(
              (assigned) => assigned.id === user.uid
            );

          case 'development':
          case 'design':
          case 'marketing':
          case 'sales':
            return doc.category === currentFilter;

          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {document && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
