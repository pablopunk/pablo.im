import { createContext, useEffect, useState } from 'react'
import { useAuthStateChange, useClient } from 'react-supabase'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export default function AuthProvider({ children }) {
  const client = useClient()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const session = client.auth.session()
    setState({ session, user: session?.user ?? null })
  }, [])

  useAuthStateChange((event, session) => {
    // console.log(`Supbase auth event: ${event}`, session)
    setState({ session, user: session?.user ?? null })
  })

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
