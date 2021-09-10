import Button from 'components/Button'
import { useState } from 'react'

export default function LoginForm({
  onFormSubmit,
  error,
  fetching,
  successful,
}) {
  const [email, setEmail] = useState('')

  const inputStyles =
    'rounded my-2 px-2 py-1 border focus:outline-none bg-bgDim shadow-md'

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className={inputStyles}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={(e) => e.keyCode === 13 && onFormSubmit(email)}
        placeholder="Email"
      />
      <div>
        <Button
          className="w-full mt-2"
          href={() => onFormSubmit(email)}
          disabled={fetching || successful}
        >
          {fetching ? 'Loading...' : 'Log in'}
        </Button>
      </div>
      <div className="mt-3">
        {error ? (
          <div className="text-danger">{error}</div>
        ) : successful ? (
          <div className="text-accent">Check your inbox!</div>
        ) : (
          <div>We'll send you a magic link</div>
        )}
      </div>
    </div>
  )
}
