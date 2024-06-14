import type { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

type Props = {
  children: ReactNode | ReactNode[]
}

const Page = ({ children }: Props) => (
  <>
    <Header />
    <main className="max-w-[1300px] p-4 mx-auto h-fill flex items-center justify-center flex-col">
      {children}
    </main>
    <Footer />
  </>
)

export default Page
