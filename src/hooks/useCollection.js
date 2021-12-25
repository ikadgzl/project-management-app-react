import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    //query = ['x', '==', 'uid']
    if (query) ref = ref.where(...query);
    if (orderBy) ref = ref.orderBy(...query);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let documents = [];

        snapshot.docs.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        console.log(documents);

        setDocuments(documents);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError('could not fetch the data');
      }
    );

    return () => {
      unsubscribe();
    };
  }, [collection, query, orderBy]);

  return { documents, error };
};
