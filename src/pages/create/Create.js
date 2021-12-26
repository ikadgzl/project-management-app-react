import { useEffect, useState } from 'react';
import './Create.css';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
];

const Create = () => {
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    details: '',
    dueDate: ''
  });
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const { documents } = useCollection('users');

  useEffect(() => {
    if (documents) {
      const userOptions = documents.map((user) => ({
        value: user,
        label: user.displayName
      }));

      setUsers(userOptions);
    }
  }, [documents]);

  const createInputHandler = (e) => {
    setProjectInfo((prevProjectInfo) => ({
      ...prevProjectInfo,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(projectInfo, category, assignedUsers);
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>

      <form onSubmit={submitHandler}>
        <label>
          <span>Project name:</span>
          <input
            type='text'
            name='name'
            onChange={createInputHandler}
            value={projectInfo.name}
            required
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            type='text'
            name='details'
            onChange={createInputHandler}
            value={projectInfo.details}
            required
          />
        </label>

        <label>
          <span>Set due date:</span>
          <input
            type='date'
            name='dueDate'
            onChange={createInputHandler}
            value={projectInfo.dueDate}
            required
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select options={categories} onChange={(opt) => setCategory(opt)} />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(opt) => setAssignedUsers(opt)}
            isMulti
          />
        </label>

        <button className='btn' type='submit'>
          Add Project
        </button>
      </form>
    </div>
  );
};

export default Create;
