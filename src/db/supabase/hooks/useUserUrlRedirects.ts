import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import type { UrlRedirect } from "../../types"
import client from "../client"

const TABLE_NAME = "url_redirects"

export const useUserUrlRedirects = (user: User, search?: string) => {
  const [data, setData] = useState<UrlRedirect[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [fetching, setFetching] = useState(false)

  const fetchData = async () => {
    setFetching(true)
    setError(null)
    try {
      let query = client.from(TABLE_NAME).select("*").eq("user_id", user.id)

      if (search) {
        query = query.or(`from.ilike.%${search}%,to.ilike.%${search}%`)
      }

      const { data: results, error: queryError } = await query

      if (queryError) throw queryError
      setData(results || [])
    } catch (err) {
      setError(err as Error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user.id, search])

  return {
    data,
    error,
    fetching,
    reexecute: fetchData,
  }
}

export const useInsertUrlRedirect = () => {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const insert = async (record: Partial<UrlRedirect>) => {
    setFetching(true)
    setError(null)
    try {
      const { error: insertError } = await client
        .from(TABLE_NAME)
        .insert(record)

      if (insertError) {
        if (insertError.message.includes("duplicate key")) {
          throw new Error("This URL is already in use")
        }
        throw insertError
      }
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return {
    insert,
    error,
    fetching,
  }
}

export const useDeleteUrlRedirect = () => {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteFn = async (id: string) => {
    setFetching(true)
    setError(null)
    try {
      const { error: deleteError } = await client
        .from(TABLE_NAME)
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setFetching(false)
    }
  }

  return {
    deleteFn,
    error,
    fetching,
  }
}
