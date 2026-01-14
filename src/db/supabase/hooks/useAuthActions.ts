import { useState } from "react"
import client from "../client"

function getRedirectUrl(): string {
  // In development mode, use localhost
  if (import.meta.env.DEV) {
    return "http://localhost:4321"
  }

  // In production on Vercel, use VERCEL_URL if available
  if (import.meta.env.PUBLIC_VERCEL_URL) {
    return `https://${import.meta.env.PUBLIC_VERCEL_URL}`
  }

  // Fallback to production domain
  return "https://pablo.im"
}

export function useSignIn() {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signIn = async (email: string) => {
    setFetching(true)
    setError(null)
    try {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: getRedirectUrl(),
        },
      })
      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return [signIn, { fetching, error }] as const
}

export function useSignInWithProvider() {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signInWithProvider = async (provider: "google" | "github") => {
    setFetching(true)
    setError(null)
    try {
      const { error } = await client.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getRedirectUrl(),
        },
      })
      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return [signInWithProvider, { fetching, error }] as const
}

export function useSignUp() {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signUp = async (email: string, password: string) => {
    setFetching(true)
    setError(null)
    try {
      const { error } = await client.auth.signUp({
        email,
        password,
      })
      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return [signUp, { fetching, error }] as const
}

export function useSignOut() {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signOut = async () => {
    setFetching(true)
    setError(null)
    try {
      const { error } = await client.auth.signOut()
      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return [signOut, { fetching, error }] as const
}
