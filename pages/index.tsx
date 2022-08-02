import { LoadingScreen } from 'components/LandingScreen'
import UrlRedirects from 'components/UrlRedirects'
import { useAuth } from 'db'
import { FunctionComponent } from 'react'

type Props = {}

const Index: FunctionComponent<Props> = () => {
  const { user } = useAuth()

  return <>{user ? <UrlRedirects user={user} /> : <LoadingScreen />}</>
}

export default Index
