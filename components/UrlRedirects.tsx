import {
  useDeleteUrlRedirect,
  useInsertUrlRedirect,
  useUserUrlRedirects,
} from 'db'
import { UrlRedirect, User } from 'db/types'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { BiBookAdd, BiPencil, BiTrash } from 'react-icons/bi'
import { BsArrowBarRight } from 'react-icons/bs'
import isUrl from 'is-url'
import { isValidName } from 'lib/isValidName'

export default function UrlRedirects({ user }: { user: User }) {
  const {
    data: redirects,
    fetching: loadingData,
    reexecute,
    error: fetchError,
  } = useUserUrlRedirects(user)
  const [addingOne, setAddingOne] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const {
    insert,
    fetching: loadingInsert,
    error: insertError,
  } = useInsertUrlRedirect()
  const { deleteFn, fetching: loadingDelete } = useDeleteUrlRedirect()
  const [error, setError] = useState('')

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message)
    } else if (insertError) {
      setError(insertError.message)
    } else {
      setError('')
    }
  }, [fetchError, insertError])

  const handleSubmitNewUrlRedirect = () => {
    if (!from || !to) {
      setError('From and To must be filled')
      return
    }
    if (!isUrl(to)) {
      setError(`"${to}" is not a valid URL`)
      return
    }
    if (!isValidName(from)) {
      setError(`"${from}" is not a valid name`)
      return
    }
    insert({ from, to, user_id: user.id })
      .then(reexecute)
      .then(() => error == null && setAddingOne(false))
      .then(() => setTo(''))
      .catch((error) => setError(error.message))
  }

  const handleDeleteUrlRedirect = (urlRedirect: UrlRedirect) => {
    deleteFn(urlRedirect.id)
      .then(reexecute)
      .catch((error) => setError(error.message))
  }

  return (
    <div className="max-w-[600px]">
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
              className="w-full bg-transparent focus:outline-none "
            />
          </div>
          <Button
            href={handleSubmitNewUrlRedirect}
            type="action"
            className="mt-4 font-sans"
            disabled={loadingInsert}
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
          rounded
        >
          Add one
        </Button>
      )}
      <div className="my-3 text-danger">{error}</div>
      {redirects.map((redirect) => (
        <div
          key={redirect.id}
          className="flex items-center justify-between w-full py-1 pl-3 pr-2 my-2 border rounded-full shadow"
        >
          <div className="flex items-center">
            <div className="relative w-40 truncate">
              <a
                href={'https://pablo.im/' + redirect.from}
                className="mr-1 transition-all hover:underline text-accent"
              >
                /{redirect.from}
              </a>
            </div>
            <span>
              <BsArrowBarRight className="text-lg" />
            </span>
            <a
              href={redirect.to}
              className="max-w-[300px] mx-2 truncate transition-all hover:underline"
            >
              {redirect.to}
            </a>
          </div>
          <div className="flex">
            <Button href="" icon={<BiPencil />} rounded />
            <Button
              href={() => handleDeleteUrlRedirect(redirect)}
              icon={<BiTrash />}
              type="danger"
              rounded
            />
          </div>
        </div>
      ))}
    </div>
  )
}
