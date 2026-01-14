import { defineMiddleware } from "astro:middleware"
import { createClient } from "../lib/supabase/server"

export const onRequest = defineMiddleware(async (context, next) => {
  // Create Supabase server client with cookie handling
  const supabase = createClient(context)

  // Handle OAuth callback - exchange code for session
  const url = new URL(context.request.url)
  const code = url.searchParams.get("code")

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Get the authenticated user (validates JWT)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Make user and supabase client available to all pages
  context.locals.user = user
  context.locals.supabase = supabase

  return next()
})
