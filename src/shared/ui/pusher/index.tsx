import { MinSvg, PluSvg } from '../../assets'
import Button from '../button'
import style from './index.module.scss'

interface PropType {
  count: number
  onClickMin: () => void
  onClickPlus: () => void
}

export default function Pusher({ count, onClickMin, onClickPlus }: PropType) {
  return (
    <div className={style.flex}>
      <Button icon={<MinSvg />} className="butMin" onClick={onClickMin} />
      <p>{count}</p>
      <Button icon={<PluSvg />} className="butPlus" onClick={onClickPlus} />
    </div>
  )
}
