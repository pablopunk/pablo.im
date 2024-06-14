import { SITE_NAME } from "config"
import Link from "next/link"
import type { FunctionComponent } from "react"
import Nav from "./Nav"

type Props = {}

const Page: FunctionComponent<Props> = () => (
  <header className="flex items-center justify-between w-full p-4 transition-colors bg-bgDim h-header">
    <Link href="/">
      <h1 className="text-2xl transition-colors hover:text-accent2 text-accent">
        {SITE_NAME}
      </h1>
    </Link>
    <Nav />
  </header>
)

export default Page
