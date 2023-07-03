import { useEffect, useState } from 'react'

export const useFavicons = (urls: string[]) => {
  const [favicons, setFavicons] = useState([])

  useEffect(() => {
    const fetchFavicons = async () => {
      try {
        const response = await fetch('/api/favicons', {
          method: 'POST',
          body: JSON.stringify({ urls }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) setFavicons(await response.json())
        else throw new Error('An error occurred while fetching favicons.')
      } catch (error) {
        console.error(error)
      }
    }

    urls && urls.length > 0 && fetchFavicons()
  }, [urls])

  return favicons
}
