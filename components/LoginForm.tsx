/* eslint-disable no-unused-vars */
import Button from 'components/Button'
import { useState } from 'react'
import { ImGoogle, ImGithub } from 'react-icons/im'

type Props = {
  onEmailLogin(email: string): void
  onProviderLogin(provider: string): void
  error?: string
  fetching?: boolean
  successful?: boolean
}

export default function LoginForm({
  onEmailLogin,
  onProviderLogin,
  error,
  fetching,
  successful,
}) {
  const [email, setEmail] = useState('')

  const inputStyles =
    'rounded my-2 px-2 py-1 border focus:outline-none bg-bgDim shadow-md'

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center ">
        <input
          className={inputStyles}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={(e) => e.keyCode === 13 && onEmailLogin(email)}
          placeholder="Email"
        />
        {email.length > 0 && (
          <Button
            href={() => onEmailLogin(email)}
            disabled={fetching || successful}
          >
            {fetching ? 'Loading...' : 'Log in'}
          </Button>
        )}
      </div>
      {email.length > 0 && (
        <div className="mb-1">
          {error ? (
            <div className="text-danger">{error}</div>
          ) : successful ? (
            <div className="text-accent">Check your inbox!</div>
          ) : (
            <div>We'll send you a magic link</div>
          )}
        </div>
      )}
      <div className="border-t w-full pt-2 mt-2 flex items-center justify-center gap-2">
        <Button
          href={() => onProviderLogin('google')}
          Icon={ImGoogle}
          className="p-1"
        ></Button>
        <Button
          href={() => onProviderLogin('github')}
          Icon={ImGithub}
          className="p-1"
        ></Button>
      </div>
    </div>
  )
}
