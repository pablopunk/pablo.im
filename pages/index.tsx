import UrlRedirects from 'components/UrlRedirects'
import { useAuth } from 'db'
import { FunctionComponent } from 'react'

type Props = {}

const Index: FunctionComponent<Props> = () => {
  const { user } = useAuth()

  return (
    <>
      <h1 className="text-2xl">Manage your URL redirects</h1>

      {user && <UrlRedirects user={user} />}
    </>
  )
}

export default Index
