import { createClient as createBrowserClient } from "../../lib/supabase/client"

// Export the browser client for use in React components
const client = createBrowserClient()

export default client
