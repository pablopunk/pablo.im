import type { ReactNode } from "react"
import { SITE_NAME } from "../../config"
import Nav from "./Nav"

interface Props {
  children: ReactNode
  showFooter?: boolean
}

export default function PageContent({ children, showFooter = true }: Props) {
  return (
    <>
      <header className="flex items-center justify-between w-full p-4 transition-colors bg-bgDim h-header">
        <a href="/">
          <h1 className="text-2xl transition-colors hover:text-accent2 text-accent">
            {SITE_NAME}
          </h1>
        </a>
        <Nav />
      </header>

      <main className="max-w-[1300px] p-4 mx-auto h-fill flex items-center justify-center flex-col">
        {children}
      </main>

      {showFooter && (
        <footer className="flex items-center justify-center w-full p-4 transition-colors bg-bgDim h-footer">
          <p className="text-sm text-fg">
            Made by{" "}
            <a
              href="https://github.com/pablopunk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              @pablopunk
            </a>
          </p>
        </footer>
      )}
    </>
  )
}
