import { FunctionComponent } from 'react'
import useTheme from 'hooks/useTheme'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useAuth, useSignOut } from 'db'
import Button from 'components/Button'
type Props = {}

const Page: FunctionComponent<Props> = () => {
  const [theme, toggleTheme] = useTheme()
  const { session, user } = useAuth()
  // eslint-disable-next-line no-unused-vars
  const [_, signOut] = useSignOut()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <nav className="flex">
      {session && user ? (
        <>
          <Button href="/profile">My account</Button>
          <Button href={handleSignOut}>Log out</Button>
        </>
      ) : (
        <Button href="/login">Log in</Button>
      )}
      <Button href={toggleTheme}>
        {theme === 'dark' ? <RiMoonLine /> : <RiSunLine />}
      </Button>
    </nav>
  )
}

export default Page
