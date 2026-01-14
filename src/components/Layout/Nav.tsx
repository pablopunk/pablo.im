import type { FunctionComponent } from "react"
import { ImGithub } from "react-icons/im"
import { RiMoonLine, RiSunLine } from "react-icons/ri"
import { useAuth, useSignOut } from "../../db"
import useTheme from "../../hooks/useTheme"
import Button from "../Button"
type Props = {}

const Page: FunctionComponent<Props> = () => {
  const [theme, toggleTheme] = useTheme()
  const { session, user, loading } = useAuth()
  const [signOut] = useSignOut()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  if (loading) {
    return <nav className="flex" />
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
