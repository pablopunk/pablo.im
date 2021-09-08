import { useAuth } from 'db'

export default function Profile() {
  const { user } = useAuth()

  return (
    <>
      <h1 className="mb-5 text-3xl text-accent">Your account</h1>
      <div>{user?.email}</div>
      <div className="mt-1 text-xs italic">
        Since {new Date(user?.created_at).toLocaleDateString()}
      </div>
    </>
  )
}
