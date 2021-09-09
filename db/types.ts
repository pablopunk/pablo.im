import { definitions } from './supabase/generated-types'

export type User = {
  id: string
  email: string
  confirmed_at: string
  last_sign_in_at: string
  user_metadata: any
  created_at: string
}

export type UrlRedirect = definitions['url_redirects']
