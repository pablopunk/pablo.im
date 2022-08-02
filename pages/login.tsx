import LoginForm from 'components/LoginForm'
import { useSignIn } from 'db'
import { useEffect, useState } from 'react'

export default function Login() {
  const [{ error: signInError, fetching }, signIn] = useSignIn()
  const [clicked, setClicked] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (signInError) {
      setError(signInError.message)
    }
  }, [signInError])

  useEffect(() => {
    if (!fetching && clicked && !error) {
      setSuccessful(true)
    }
  }, [fetching])

  const clickedLogin = (email) => {
    if (!email) {
      setError('Type your email')
      return
    }
    setClicked(true)
    signIn({ email })
  }

  const onProviderLogin = (provider) => {
    signIn({ provider })
  }

  return (
    <LoginForm
      onEmailLogin={clickedLogin}
      onProviderLogin={onProviderLogin}
      error={error}
      fetching={fetching}
      successful={successful}
    />
  )
}
