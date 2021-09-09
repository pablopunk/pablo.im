import Button from 'components/Button'
import UrlRedirects from 'components/UrlRedirects'
import { useAuth, useUserUrlRedirects } from 'db'
import { FunctionComponent, useState } from 'react'
import { BiBookAdd } from 'react-icons/bi'

type Props = {}

const Index: FunctionComponent<Props> = () => {
  const { user } = useAuth()
  const { data: redirects } = useUserUrlRedirects(user)
  const [addingOne, setAddingOne] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  return (
    <>
      <h1 className="text-2xl">Manage your URL redirects</h1>
      {addingOne ? (
        <div className="p-4 mt-3 font-mono border rounded shadow-lg">
          <div className="flex items-start p-2 mb-2 border rounded">
            <label className="mr-1 font-bold">From</label>
            <div className="font-mono">
              <span className="text-accent mr-[1px]">pablo.im/</span>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="short-id"
                className="bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center p-2 border rounded">
            <label className="mr-2 font-bold">To</label>
            <input
              type="url"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="https://long-url.com/whatever"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <Button
            href={() => setAddingOne(false)}
            type="action"
            className="mt-4 font-sans"
          >
            Submit
          </Button>
        </div>
      ) : (
        <Button
          href={() => setAddingOne(true)}
          icon={<BiBookAdd />}
          type="action"
          className="mt-4"
        >
          Add one
        </Button>
      )}

      <UrlRedirects redirects={redirects} />
    </>
  )
}

export default Index
