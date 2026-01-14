import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr"
import type { APIContext } from "astro"

export function createClient(context: APIContext) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Get all cookies from the request headers
          const cookieHeader = context.request.headers.get("cookie")
          return parseCookieHeader(cookieHeader ?? "").map((cookie) => ({
            name: cookie.name,
            value: cookie.value || "",
          }))
        },
        setAll(cookiesToSet) {
          // Set cookies using Astro's cookies API
          for (const { name, value, options } of cookiesToSet) {
            context.cookies.set(name, value, options)
          }
        },
      },
    },
  )
}
