import type { ReactNode } from "react"
import { AuthProvider, DatabaseProvider } from "../db"
import PageContent from "./Layout/PageContent"

interface Props {
  children: ReactNode
  showFooter?: boolean
}

export default function AppShell({ children, showFooter = true }: Props) {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <PageContent showFooter={showFooter}>{children}</PageContent>
      </AuthProvider>
    </DatabaseProvider>
  )
}
