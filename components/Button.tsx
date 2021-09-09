import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent, ReactNode } from 'react'

type Props = {
  href: (() => void) | string
  className?: string
  disabled?: boolean
  icon?: ReactNode
  type?: 'action' | 'default' | 'danger'
  rounded?: boolean
}

const Button: FunctionComponent<Props> = ({
  children,
  href,
  className,
  disabled,
  icon,
  type = 'default',
  rounded = false,
}) => {
  const commonStyles =
    'm-1 px-2 py-1 border rounded-md shadow-md flex items-center justify-center transition-all focus:outline-none'
  const commonHoverStyles =
    'hover:border-accent hover:shadow-lg hover:scale-105'
  const disabledStyles = 'opacity-50 cursor-not-allowed'
  const defaultStyles = 'bg-bg hover:text-accent'
  const actionStyles =
    'bg-accent text-bg border-accent hover:text-accent hover:bg-bg'
  const dangerStyles = 'text-danger hover:border-danger bg-bg'
  const iconStyles = classNames({
    'mr-1': icon && children,
    'my-1': icon && children == null,
  })
  const styles = classNames(className, commonStyles, {
    [commonHoverStyles]: !disabled,
    [disabledStyles]: disabled,
    [defaultStyles]: !disabled && type === 'default',
    [actionStyles]: !disabled && type === 'action',
    [dangerStyles]: !disabled && type === 'danger',
    'rounded-full': rounded,
  })

  if (typeof href === 'function') {
    if (disabled) {
      return (
        <button className={styles} disabled>
          {icon && <span className={iconStyles}>{icon}</span>}
          {children}
        </button>
      )
    }
    return (
      <button onClick={href} className={styles}>
        {icon && <span className={iconStyles}>{icon}</span>}
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <a className={styles}>
        {icon && <span className={iconStyles}>{icon}</span>}
        {children}
      </a>
    </Link>
  )
}

export default Button
