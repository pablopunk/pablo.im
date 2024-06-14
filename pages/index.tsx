import { LandingScreen } from "components/LandingScreen"
import UrlRedirects from "components/UrlRedirects"
import { useAuth } from "db"
import type { FunctionComponent } from "react"

type Props = {}

const Index: FunctionComponent<Props> = () => {
  const { user } = useAuth()

  return <>{user ? <UrlRedirects user={user} /> : <LandingScreen />}</>
}

export default Index
