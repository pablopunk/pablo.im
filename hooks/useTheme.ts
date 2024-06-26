import { useEffect, useState } from "react"

type Theme = "dark" | "light" | null

export default function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(null)

  useEffect(() => {
    updateState()
  }, [])

  const updateState = () => {
    const dark = document.body.classList.contains("dark")
    setTheme(dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    window["__toggleDarkMode"]?.()
    updateState()
  }

  if (typeof window !== "undefined") {
    const observer = new MutationObserver(() => {
      updateState()
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    })
  }

  return [theme, toggleTheme]
}
