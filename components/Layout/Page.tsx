import Header from './Header'
import Footer from './Footer'
import type { ReactNode } from 'react'

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
