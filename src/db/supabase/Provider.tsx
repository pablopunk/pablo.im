import type { SupabaseClient } from "@supabase/supabase-js"
import { createContext } from "react"
import client from "./client"

export const DatabaseContext = createContext<SupabaseClient>(client)

export default function DatabaseProvider({
  children,
}: { children: React.ReactNode }) {
  return (
    <DatabaseContext.Provider value={client}>
      {children}
    </DatabaseContext.Provider>
  )
}
