import style from './index.module.scss'

interface ButtonProps {
  count?: number
  label?: string
  icon?: React.ReactNode
  className?: keyof typeof style
  onClick?: () => void
}

export default function Button({
  count,
  label,
  icon,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${style.btn} ${className ? style[className] : ''}`}
    >
      {(count ?? 0) > 0 && <p>{count}</p>} <span>{label}</span>{' '}
      {icon && <span className="icon">{icon}</span>}
    </button>
  )
}
