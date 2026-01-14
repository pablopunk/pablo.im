import fetchFavicon from "@meltwater/fetch-favicon"
import type { APIRoute } from "astro"

const fetchFaviconSafely = async (url: string) => {
  const urlObject = new URL(url)
  const defaultFavicon = `${urlObject.protocol}//${urlObject.hostname}/favicon.ico`

  try {
    return await fetchFavicon(url)
  } catch (error) {
    return defaultFavicon
  }
}

export type FaviconsApiBody = { urls: string[] }
export type FaviconsApiResponse = Record<string, string>

export const POST: APIRoute = async ({ request }) => {
  try {
    const { urls } = (await request.json()) as FaviconsApiBody

    const favicons = await Promise.all(urls.map(fetchFaviconSafely))
    const urlFavicons: FaviconsApiResponse = urls.reduce((acc, url, index) => {
      acc[url] = favicons[index]
      return acc
    }, {} as FaviconsApiResponse)

    return new Response(JSON.stringify(urlFavicons), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching favicons." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
