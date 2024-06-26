import classNames from "classnames"
import { SITE_URL } from "config"
import {
  useDeleteUrlRedirect,
  useInsertUrlRedirect,
  useUserUrlRedirects,
} from "db"
import type { UrlRedirect, User } from "db/types"
import { useFavicons } from "hooks/useFavicons"
import isUrl from "is-url"
import { isValidName } from "lib/isValidName"
import React, { useEffect, useMemo, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { BiBookAdd, BiSearchAlt, BiTrash } from "react-icons/bi"
import { BsArrowBarRight } from "react-icons/bs"
import { RiCloseLine } from "react-icons/ri"
import Button from "./Button"

const FAVICON_SIZE = 24

export default function UrlRedirects({ user }: { user: User }) {
  const [search, setSearch] = useState("")
  const {
    data: redirects,
    fetching: loadingData,
    reexecute,
    error: fetchError,
  } = useUserUrlRedirects(user, search)
  const [addingOne, setAddingOne] = useState(false)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const {
    insert,
    fetching: loadingInsert,
    error: insertError,
  } = useInsertUrlRedirect()
  const { deleteFn, fetching: loadingDelete } = useDeleteUrlRedirect()
  const [error, setError] = useState("")
  const urlsToFetchFavicons = useMemo(
    () => redirects.map((redirect) => redirect.to),
    [redirects],
  )
  const favicons = useFavicons(urlsToFetchFavicons)

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message)
    } else if (insertError) {
      setError(insertError.message)
    } else {
      setError("")
    }
  }, [fetchError, insertError])

  const handleSubmitNewUrlRedirect = () => {
    if (!from || !to) {
      setError("From and To must be filled")
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
      .then(() => setTo(""))
      .catch((error) => setError(error.message))
  }

  const handleDeleteUrlRedirect = (urlRedirect: UrlRedirect) => {
    deleteFn(urlRedirect.id)
      .then(reexecute)
      .catch((error) => setError(error.message))
  }

  return (
    <div className="flex flex-col items-center w-full md:max-w-[600px]">
      <h1 className="text-2xl">Manage your URL redirects</h1>
      {addingOne ? (
        <div className="relative flex flex-col items-center max-w-full p-4 mt-3 font-mono border rounded shadow-lg">
          <Button
            className="absolute -top-5 -right-5"
            href={() => setAddingOne(false)}
            Icon={RiCloseLine}
            type="danger"
            rounded
          />
          <div className="flex gap-1 items-start w-full p-2 mb-2 border rounded">
            <label className="font-bold">From</label>
            <div className="flex font-mono">
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
          <div className="flex items-center gap-1 w-full p-2 border rounded">
            <label className="font-bold">To</label>
            <input
              type="url"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSubmitNewUrlRedirect()}
              placeholder="https://long-url.com/whatever"
              className="w-full bg-transparent focus:outline-none "
            />
          </div>
          <Button
            href={handleSubmitNewUrlRedirect}
            type="action"
            className="mt-4 font-sans text-center"
            disabled={loadingInsert}
          >
            Submit
          </Button>
        </div>
      ) : (
        <Button
          href={() => setAddingOne(true)}
          Icon={BiBookAdd}
          type="action"
          className="mx-auto mt-4"
          rounded
        >
          Add one
        </Button>
      )}
      {(redirects.length > 0 || search) && (
        <div className="flex gap-2 items-center px-2 py-1 my-4 border rounded-full">
          <BiSearchAlt className="text-accent" size="1.5rem" />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
      )}
      {error && <div className="my-3 text-danger">{error}</div>}
      {(loadingData || loadingDelete || loadingInsert) && (
        <AiOutlineLoading className="w-full text-4xl text-center animate-spin" />
      )}
      {redirects.map((redirect) => (
        <div
          key={redirect.id}
          className="flex items-center justify-between w-full py-1 pl-5 pr-2 my-2 border rounded-full shadow"
        >
          <div className="flex items-center overflow-hidden gap-2">
            <div
              className={classNames(
                "rounded-full flex items-center justify-center",
                {},
              )}
            >
              {!!favicons[redirect.to] || ( // loading state
                <img
                  width={FAVICON_SIZE / 2}
                  height={FAVICON_SIZE / 2}
                  src="/favicon.png"
                  alt="favicon"
                  className="absolute animate-ping"
                />
              )}
              <img
                width={FAVICON_SIZE}
                height={FAVICON_SIZE}
                src={favicons[redirect.to]}
                alt={redirect.from}
                className={classNames(
                  "rounded-full",
                  `w-[${FAVICON_SIZE}] h-[${FAVICON_SIZE}]`,
                )}
                onError={(e) => {
                  e.currentTarget.src = "/favicon.png"
                }}
                style={{
                  opacity: favicons[redirect.to] ? 1 : 0,
                }}
              />{" "}
            </div>
            <div className="relative max-w-xs truncate">
              <a
                href={`${SITE_URL}/${redirect.from}`}
                className="transition-all hover:underline text-accent"
              >
                /{redirect.from}
              </a>
            </div>
            <span>
              <BsArrowBarRight className="text-lg" />
            </span>
            <a
              href={redirect.to}
              className="max-w-xs mx-2 italic truncate transition-all hover:underline opacity-80"
            >
              {redirect.to}
            </a>
          </div>
          <div className="flex">
            {/*<Button href="" icon={<BiPencil />} rounded />*/}
            <Button
              href={() => handleDeleteUrlRedirect(redirect)}
              Icon={BiTrash}
              type="danger"
              rounded
            />
          </div>
        </div>
      ))}
    </div>
  )
}
