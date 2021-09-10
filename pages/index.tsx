import Button from 'components/Button'
import UrlRedirects from 'components/UrlRedirects'
import { useAuth } from 'db'
import { FunctionComponent } from 'react'

type Props = {}

const Index: FunctionComponent<Props> = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <UrlRedirects user={user} />
      ) : (
        <Button href="/login" type="action" className="text-xl">
          Login
        </Button>
      )}
    </>
  )
}

export default Index
