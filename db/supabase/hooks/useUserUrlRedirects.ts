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
  const filter = useFilter((query) => query.eq('user_id', user.id), [user.id])
  const [{ count, data, error, fetching }, reexecute] = useSelect<UrlRedirect>(
    TABLE_NAME,
    { filter }
  )

  return {
    count,
    data: data || [
      { id: 123, from: 'test', to: 'https://pablopunk.com', user_id: 123 },
      {
        id: 123,
        from: 'testlonggggggggggg',
        to: 'https://pablopunk.com/longgggggggggggggggggggggggggggggggggggg',
        user_id: 123,
      },
    ],
    error,
    fetching,
    reexecute,
  }
}

export default useUserUrlRedirects
