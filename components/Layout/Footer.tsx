import { FunctionComponent } from 'react'
import { SITE_NAME } from 'config'

type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center h-footer bg-bgDim">
    © {SITE_NAME} {new Date().getFullYear()}
  </footer>
)

export default Footer
