import { PostgrestError } from '@supabase/postgrest-js'
import { UrlRedirect, User } from 'db/types'
import { useFilter, useSelect } from 'react-supabase'

const TABLE_NAME = 'url_redirects'

const useUserUrlRedirects = (
  user: User
): {
  count?: number
  error?: PostgrestError
  data?: UrlRedirect[]
  fetching: boolean
  reexecute?(): void
} => {
  if (!user) {
    return { data: [], fetching: false }
  }

  const filter = useFilter((query) => query.eq('user_id', user.id), [user.id])
  const [{ count, data, error, fetching }, reexecute] = useSelect<UrlRedirect>(
    TABLE_NAME,
    { filter }
  )

  return {
    count,
    data: data || [],
    error,
    fetching,
    reexecute,
  }
}

export default useUserUrlRedirects
