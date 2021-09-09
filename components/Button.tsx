import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent, ReactNode } from 'react'

type Props = {
  href: (() => void) | string
  className?: string
  disabled?: boolean
  icon?: ReactNode
  type?: 'action' | 'default'
}

const Button: FunctionComponent<Props> = ({
  children,
  href,
  className,
  disabled,
  icon,
  type = 'default',
}) => {
  const commonStyles =
    'm-1 px-2 py-1 border rounded-md shadow-md flex items-center justify-center transition-all focus:outline-none'
  const commonHoverStyles =
    'hover:border-accent hover:shadow-lg hover:scale-105'
  const disabledStyles = 'opacity-50 cursor-not-allowed'
  const defaultStyles = 'bg-bg hover:text-accent'
  const actionStyles =
    'bg-accent text-bg border-accent hover:text-accent hover:bg-bg'
  const styles = classNames(className, commonStyles, {
    [commonHoverStyles]: !disabled,
    [disabledStyles]: disabled,
    [defaultStyles]: !disabled && type === 'default',
    [actionStyles]: !disabled && type === 'action',
  })

  if (typeof href === 'function') {
    if (disabled) {
      return (
        <button className={styles} disabled>
          {icon && <span className="mr-1">{icon}</span>}
          {children}
        </button>
      )
    }
    return (
      <button onClick={href} className={styles}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <a className={styles}>{children}</a>
    </Link>
  )
}

export default Button
