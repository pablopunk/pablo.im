import { FunctionComponent } from 'react'
import Link from 'next/link'
import useTheme from 'hooks/useTheme'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Github', href: 'https://github.com/pablopunk/next-starter' },
]

type Props = {}

const Page: FunctionComponent<Props> = () => {
  const [theme, toggleTheme] = useTheme()
  const linkStyles =
    'px-2 py-1 ml-2 border rounded-md bg-bg focus:outline-none shadow-sm hover:shadow-md transition-all hover:text-accent'

  return (
    <nav>
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          <a className={linkStyles}>{link.label}</a>
        </Link>
      ))}
      <button className={linkStyles} onClick={toggleTheme}>
        {theme === 'dark' ? '🌚' : '🌝'}
      </button>
    </nav>
  )
}

export default Page
