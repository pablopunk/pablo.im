import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type Props = {
  href: (() => void) | string
  className?: string
  disabled?: boolean
}

const Button: FunctionComponent<Props> = ({
  children,
  href,
  className,
  disabled,
}) => {
  const basicStyles = 'm-1 px-2 py-1 border rounded-md'
  const primaryStyles =
    'bg-bg transition-all hover:border-accent shadow-sm hover:shadow-md hover:text-accent hover:scale-105'
  const disabledStyles = 'opacity-50 cursor-not-allowed'
  const styles = classNames(className, basicStyles, {
    [primaryStyles]: !disabled,
    [disabledStyles]: disabled,
  })

  if (typeof href === 'function') {
    if (disabled) {
      return (
        <button className={styles} disabled>
          {children}
        </button>
      )
    }
    return (
      <button onClick={href} className={styles}>
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
