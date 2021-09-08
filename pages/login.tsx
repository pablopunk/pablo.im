import LoginForm from 'components/LoginForm'
import { useSignIn } from 'db'
import { useEffect, useState } from 'react'

export default function Login() {
  const [{ error, fetching }, signIn] = useSignIn()
  const [clicked, setClicked] = useState(false)
  const [successful, setSuccessful] = useState(false)

  useEffect(() => {
    if (!fetching && clicked && !error) {
      setSuccessful(true)
    }
  }, [fetching])

  const clickedLogin = ({ email }) => {
    setClicked(true)
    signIn({ email })
  }

  return (
    <LoginForm
      onFormSubmit={clickedLogin}
      error={error}
      fetching={fetching}
      successful={successful}
    />
  )
}
