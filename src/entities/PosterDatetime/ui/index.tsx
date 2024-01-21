import { usePosterStore } from '@/app/stores/posterStore'
import { useTranslation } from 'i18nano'
import styles from './PosterDatetime.module.sass'
import 'dayjs/locale/ru'

export const PosterDatetime = () => {
  const t = useTranslation()
  const date = usePosterStore((state) => state.poster.date)
  const address = usePosterStore((state) => state.poster.address)
  const startTime = usePosterStore((state) => state.poster.startTime)
  const placeName = usePosterStore((state) => state.poster.placeName)

  return (
    <div className={styles['PosterDatetime']}>
      <span>{date?.locale('ru').format('DD MMMM')}, {' '}</span>
      <span>{t('start')} {startTime?.format('HH:mm')}</span>
      <br />
      <span>{address}</span>
      <br />
      <span>{placeName}</span>
    </div>
  )
}
