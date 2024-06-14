import fetchFavicon from "@meltwater/fetch-favicon"
import type { NextApiRequest, NextApiResponse } from "next"

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

export default async function FaviconsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { urls } = req.body as FaviconsApiBody

  const favicons = await Promise.all(urls.map(fetchFaviconSafely))
  const urlFavicons: FaviconsApiResponse = urls.reduce((acc, url, index) => {
    acc[url] = favicons[index]
    return acc
  }, {} as FaviconsApiResponse)

  try {
    return res.status(200).json(urlFavicons)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: "An error occurred while fetching favicons." })
  }
}
