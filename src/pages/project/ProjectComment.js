import { useState } from 'react';
import { timeStamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/Avatar';

const ProjectComment = ({ project }) => {
  const [newComment, setNewComment] = useState('');

  const {
    user: { displayName, photoURL }
  } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');

  const submitHandler = async (e) => {
    e.preventDefault();

    const comment = {
      displayName,
      photoURL,
      content: newComment,
      createdAt: timeStamp.fromDate(new Date()),
      id: Math.random()
    };

    await updateDocument(project.id, {
      comments: [...project.comments, comment]
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map(
            ({ id, photoURL, displayName, content, createdAt }) => (
              <li key={id}>
                <div className='comment-author'>
                  <Avatar src={photoURL} />
                  <p>{displayName}</p>
                </div>

                <div className='comment-date'>
                  <p>date</p>
                </div>

                <div className='comment-content'>
                  <p>{content}</p>
                </div>
              </li>
            )
          )}
      </ul>

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
