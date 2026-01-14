import { useEffect, useState } from "react"

type Theme = "dark" | "light" | null

export default function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(null)

  useEffect(() => {
    // Get initial theme state
    const updateState = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    }

    updateState()

    // Watch for theme changes on html element
    const observer = new MutationObserver(updateState)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    window["__toggleDarkMode"]?.()
  }

  return [theme, toggleTheme]
}
