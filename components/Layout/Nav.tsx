import Button from "components/Button"
import { useAuth, useSignOut } from "db"
import useTheme from "hooks/useTheme"
import type { FunctionComponent } from "react"
import { ImGithub } from "react-icons/im"
import { RiMoonLine, RiSunLine } from "react-icons/ri"
type Props = {}

const Page: FunctionComponent<Props> = () => {
  const [theme, toggleTheme] = useTheme()
  const { session, user } = useAuth()
  // eslint-disable-next-line no-unused-vars
  const [_, signOut] = useSignOut()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
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
        Icon={ImGithub}
        title="Code on Github"
      />
      <Button href={toggleTheme} title="Toggle theme">
        {theme === "dark" ? <RiMoonLine /> : <RiSunLine />}
      </Button>
    </nav>
  )
}

export default Page
