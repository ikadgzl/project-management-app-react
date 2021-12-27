import { useState } from 'react';
import { timeStamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectComment = () => {
  const [newComment, setNewComment] = useState('');
  const {
    user: { displayName, photoURL }
  } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    const comment = {
      displayName,
      photoURL,
      content: newComment,
      createdAt: timeStamp.fromDate(new Date()),
      id: Math.random()
    };

    console.log(comment);
  };

  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>

      <form className='add-comment' onSubmit={submitHandler}>
        <label>
          <span>Add new comment:</span>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            required
          />
        </label>

        <button type='submit' className='btn'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default ProjectComment;
