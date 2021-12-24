import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timeStamp } from '../firebase/config';

const IS_PENDING = 'IS_PENDING';
const ADDED_DOCUMENT = 'ADDED_DOCUMENT';
const DELETED_DOCUMENT = 'DELETED_DOCUMENT';
const ERROR = 'ERROR';

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { document: null, isPending: true, error: null, success: false };

    case ADDED_DOCUMENT:
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true
      };

    case DELETED_DOCUMENT:
      return { document: null, isPending: false, error: null, success: true };

    case ERROR:
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false
      };

    default:
      state;
  }
};

const INITIAL_STATE = {
  document: null,
  isPending: false,
  error: null,
  success: null
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, INITIAL_STATE);
  const [isCancelled, setIsCancelled] = useState(null);

  const ref = projectFirestore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) dispatch(action);
  };

  const addDocument = async (doc) => {
    dispatch({ type: IS_PENDING });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatchIfNotCancelled({ type: ADDED_DOCUMENT, payload: addedDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: ERROR, payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: IS_PENDING });

    try {
      await ref.doc(id).delete();

      dispatchIfNotCancelled({ type: DELETED_DOCUMENT });
    } catch (error) {
      dispatchIfNotCancelled({
        type: ERROR,
        payload: 'could not delete the document'
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  });

  return { addDocument, deleteDocument, response };
};
