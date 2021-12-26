import { useEffect, useState } from 'react';
import './Create.css';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timeStamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

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
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { documents } = useCollection('users');
  const { addDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();

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

  const submitHandler = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (!category) {
      setFormError('Please select a project category');

      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please select at least one user to assign the project');

      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const assignedUsersList = assignedUsers.map(
      ({ value: { displayName, photoURL, id } }) => {
        return { displayName, photoURL, id };
      }
    );

    const project = {
      name: projectInfo.name,
      details: projectInfo.details,
      dueDate: timeStamp.fromDate(new Date(projectInfo.dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    };

    await addDocument(project);

    if (!response.error) {
      navigate('/');
    }
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

        <button
          className='btn'
          type='submit'
          disabled={response.isPending && true}
        >
          {!response.isPending ? 'Add Project' : 'Adding...'}
        </button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
