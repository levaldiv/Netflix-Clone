import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  //   returning bac an object
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  // reactnode means the children (signUp, signIn, signOut) will be passed
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  //   this is a firebase user
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  //   blocks the ui
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  // make sure it persists
  useEffect(
    () =>
      // accepts auth and gives user back
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //   loggedin
          setUser(user)
          setLoading(false)
        } else {
          //   not logged in
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  //   New user sign up
  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //   always need to provide types to avoid errors
        setUser(userCredential.user)
        //  redirect to home page
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  // User sign in
  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //   always need to provide types to avoid errors
        setUser(userCredential.user)
        //  redirect to home page
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  //   User sign out
  const logout = async () => {
    setLoading(false)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  // creating helper fcn
  const memValues = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memValues}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
