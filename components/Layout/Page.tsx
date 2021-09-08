import Header from './Header'
import { FunctionComponent } from 'react'
import Footer from './Footer'

type Props = {}

const Page: FunctionComponent<Props> = ({ children }) => (
  <>
    <Header />
    <main className="max-w-[1300px] p-4 mx-auto h-fill flex items-center justify-center flex-col">
      {children}
    </main>
    <Footer />
  </>
)

export default Page
