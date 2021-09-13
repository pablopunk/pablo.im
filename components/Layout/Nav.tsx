import { FunctionComponent } from 'react'
import useTheme from 'hooks/useTheme'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'
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
          <Button href={handleSignOut}>Log out</Button>
        </>
      ) : (
        <Button href="/login">Log in</Button>
      )}
      <Button
        href="https://github.com/pablopunk/pablo.im"
        icon={<ImGithub />}
        title="Code on Github"
      ></Button>
      <Button href={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? <RiMoonLine /> : <RiSunLine />}
      </Button>
    </nav>
  )
}

export default Page
