import { usePosterStore } from '@/app/stores/posterStore'
import styles from './PosterImage.module.sass'

export const PosterImage = () => {
  const imageSrc = usePosterStore((state) => state.poster.imageSrc)

  return (
    <div className={styles['PosterImage']}>
      <img src={imageSrc} alt="poster image" />
    </div>
  )
}
