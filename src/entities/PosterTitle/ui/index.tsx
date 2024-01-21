import { usePosterStore } from '@/app/stores/posterStore'
import styles from './PosterTitle.module.sass'

export const PosterTitle = () => {
  const title = usePosterStore((store) => store.poster.title)
  return <div className={styles['PosterTitle']}>{title}</div>
}
