import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

// modal state
export const modalState = atom({
  key: 'modalState',
  default: false,
})

// movie state
// Movie is going to be of type movie, docdata (from firebase) or it can be null
export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})
