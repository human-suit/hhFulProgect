import style from './index.module.scss'
import type { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <div
      className={`${style.backdrop} ${isOpen ? style.open : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`${style.modal} ${isOpen ? style.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.close} onClick={onClose}>
          ×
        </button>
        <div className={style.scrollContainer}>{children}</div>
      </div>
    </div>
  )
}
