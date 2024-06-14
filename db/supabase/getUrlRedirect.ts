import type { UrlRedirect } from "db/types"
import client from "./client"

export async function getUrlRedirect(from: string): Promise<string> {
  const { data } = await client
    .from<UrlRedirect>("url_redirects")
    .select("to")
    .eq("from", from)
    .single()

  return data?.to || null
}
