import { useState } from "react"
import { useSignIn, useSignInWithProvider } from "../db"
import LoginForm from "./LoginForm"

export default function LoginFormContainer() {
  const [signIn, { fetching: emailFetching, error: emailError }] = useSignIn()
  const [signInWithProvider, { fetching: providerFetching }] =
    useSignInWithProvider()
  const [successful, setSuccessful] = useState(false)

  const handleEmailLogin = async (email: string) => {
    try {
      await signIn(email)
      setSuccessful(true)
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const handleProviderLogin = async (provider: "google" | "github") => {
    try {
      await signInWithProvider(provider)
    } catch (err) {
      // Error is handled by the hook
    }
  }

  return (
    <LoginForm
      onEmailLogin={handleEmailLogin}
      onProviderLogin={handleProviderLogin}
      error={emailError?.message}
      fetching={emailFetching || providerFetching}
      successful={successful}
    />
  )
}
