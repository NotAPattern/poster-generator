import { Col, Row } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import type { FC } from 'react'
import styles from './Poster.module.sass'
import 'dayjs/locale/ru'
import clsx from 'clsx'
import { useTranslation } from 'i18nano'

dayjs.locale('ru')

type PosterProps = {
  title?: string
  description: () => JSX.Element
  date?: Dayjs
}

export const Poster: FC<PosterProps> = ({ title, description, date }) => {
  const t = useTranslation()

  return (
    <div className={styles['Poster']}>
      <Row>
        <Col span={12}>
          <div className={clsx(styles['Poster__title'], styles['Poster_text_default'])}>{title}</div>
          <div className={clsx(styles['Poster__description'], styles['Poster_text_default'])}>{description()}</div>
        </Col>
        <Col span={12}>
          <div className={clsx(styles['Poster__description'], styles['Poster_text_default'])}>
            <span>{date?.format('DD MMMM')},</span>
            <span>{t('start')}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}
