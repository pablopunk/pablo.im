import classNames from "classnames"
import Link from "next/link"
import type React from "react"
import type { IconType } from "react-icons"

type Props = {
  children?: React.ReactNode[] | React.ReactNode
  href: (() => void) | string
  className?: string
  disabled?: boolean
  Icon?: IconType
  type?: "action" | "default" | "danger"
  rounded?: boolean
  title?: string
}

const Button = (props: Props) => {
  const {
    children,
    href,
    className,
    disabled,
    Icon,
    type = "default",
    rounded = false,
    title,
  } = props
  const commonStyles =
    "m-1 px-2 py-1 border rounded-md shadow-md flex items-center justify-center transition-all focus:outline-none"
  const commonHoverStyles =
    "hover:border-accent hover:shadow-lg hover:scale-105"
  const disabledStyles = "opacity-50 cursor-not-allowed"
  const defaultStyles = "bg-bg hover:text-accent"
  const actionStyles =
    "bg-accent text-bg border-accent hover:text-accent hover:bg-bg"
  const dangerStyles = "text-danger hover:border-danger bg-bg"
  const iconStyles = classNames({
    "mr-1": Icon && children,
    "my-1": Icon && children == null,
  })
  const styles = classNames(className, commonStyles, {
    [commonHoverStyles]: !disabled,
    [disabledStyles]: disabled,
    [defaultStyles]: !disabled && type === "default",
    [actionStyles]: !disabled && type === "action",
    [dangerStyles]: !disabled && type === "danger",
    "rounded-full": rounded,
  })

  if (typeof href === "function") {
    if (disabled) {
      return (
        <button type="button" className={styles} disabled title={title}>
          {Icon && (
            <span className={iconStyles}>
              <Icon />
            </span>
          )}
          {children}
        </button>
      )
    }
    return (
      <button type="button" onClick={href} className={styles} title={title}>
        {Icon && (
          <span className={iconStyles}>
            <Icon />
          </span>
        )}
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={styles} title={title}>
      {Icon && (
        <span className={iconStyles}>
          <Icon />
        </span>
      )}
      {children}
    </Link>
  )
}

export default Button
