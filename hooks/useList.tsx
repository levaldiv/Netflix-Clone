import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Movie } from '../typings'

/** Retrieving current movise in myList **/

// adding the movie for every single user to the databse
function useList(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([])

  useEffect(() => {
    //   if there is no UID return to protect
    if (!uid) return

    return onSnapshot(
      //  goes into the db -> customers collection -> document of current user -> create a myList collection
      collection(db, 'customers', uid, 'myList'),
      //   gives me all the documents inside myList
      (snapshot) => {
        setList(
          // mappping through every single document
          // retuning an object with the id and the data (merging them)
          snapshot.docs.map((doc) => ({
            //   merging the id and the data into one single object/array
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
    // anytime the db or uid change, run this function again
  }, [db, uid])

  return list
}

export default useList
