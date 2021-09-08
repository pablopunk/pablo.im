import client from './client'
import { Provider } from 'react-supabase'

const SupabaseProvider = ({ children }) => (
  <Provider value={client}>{children}</Provider>
)

export default SupabaseProvider
