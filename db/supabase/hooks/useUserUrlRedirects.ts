import { PostgrestError } from '@supabase/postgrest-js'
import { UrlRedirect, User } from 'db/types'
import { useDelete, useFilter, useInsert, useSelect } from 'react-supabase'

const TABLE_NAME = 'url_redirects'

export const useUserUrlRedirects = (
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
    data: data || [],
    error,
    fetching,
    reexecute,
  }
}

export const useInsertUrlRedirect = () => {
  const [{ error, fetching }, insert] = useInsert<UrlRedirect>(TABLE_NAME)

  return {
    insert,
    error:
      error == null
        ? null
        : error?.message.includes('duplicate key')
        ? {
            message: 'This URL is already in use',
          }
        : error,
    fetching,
  }
}

export const useDeleteUrlRedirect = () => {
  const [{ error, fetching }, deleteFn] = useDelete<UrlRedirect>(TABLE_NAME)

  return {
    deleteFn(id: UrlRedirect['id']) {
      return deleteFn((query) => query.eq('id', id))
    },
    error,
    fetching,
  }
}
