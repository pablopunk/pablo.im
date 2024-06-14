import { Provider } from "react-supabase"
import client from "./client"

const SupabaseProvider = ({ children }) => (
  <Provider value={client}>{children}</Provider>
)

export default SupabaseProvider
