import { FunctionComponent } from 'react'

type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center h-footer bg-bgDim">
    © Pablo Varela {new Date().getFullYear()}
  </footer>
)

export default Footer
