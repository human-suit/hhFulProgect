import { useEffect, useState, type RefObject } from 'react'

export default function useHover(ref: RefObject<HTMLElement>) {
  const [isHover, setIsHover] = useState(false)

  const on = () => setIsHover(true)
  const off = () => setIsHover(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    node.addEventListener('mouseenter', on)
    node.addEventListener('mousemove', on)
    node.addEventListener('mouseleave', off)

    return function () {
      node.removeEventListener('mouseenter', on)
      node.removeEventListener('mousemove', on)
      node.removeEventListener('mouseleave', off)
    }
  }, [])

  return { isHover }
}
