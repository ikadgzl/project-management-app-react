const FILTER_LIST = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales'
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (f) => {
    changeFilter(f);
  };

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {FILTER_LIST.map((f) => (
          <button
            className={currentFilter === f ? 'active' : ''}
            key={f}
            onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
