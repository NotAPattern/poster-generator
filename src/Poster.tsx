import { Col, Flex, Row } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { type FC, useEffect, useRef, useState } from 'react'
import styles from './Poster.module.sass'
import 'dayjs/locale/ru'
import clsx from 'clsx'
import { useTranslation } from 'i18nano'
import { create as createRandom } from 'random-seed'

dayjs.locale('ru')

type PosterProps = {
  title?: string
  description: () => JSX.Element
  date?: Dayjs
  startTime?: Dayjs
  imageSrc?: string
  address?: string
  placeName?: string
  emojis?: string[]
  posterRef: React.RefObject<HTMLDivElement>
}

const EMOJI_MIN_SIZE = 2
const EMOJI_MAX_SIZE = 7

export const Poster: FC<PosterProps> = (
  { title, description, date, startTime, imageSrc, address, placeName, emojis, posterRef },
) => {
  const t = useTranslation()

  const [posterSize, setPosterSize] = useState<{ width: number; height: number } | undefined>(undefined)

  useEffect(() => {
    if (posterRef.current) {
      const poster = posterRef.current
      setPosterSize({ width: poster.clientWidth, height: poster.clientHeight })
    }
  }, [posterRef])

  const Emojis = () => {
    const rand = createRandom()
    // rand.seed('42')
    return (
      <>
        {posterSize
          && emojis?.map((emoji) => (
            <div
              className={styles['Poster__emoji']}
              style={{
                left: rand(posterSize.width),
                top: rand(posterSize.height),
                fontSize: `${rand.floatBetween(EMOJI_MIN_SIZE, EMOJI_MAX_SIZE)}rem`,
                transform: `rotate(${rand(2) ? '' : '-'}${rand(45)}deg)`,
              }}
            >
              {emoji}
            </div>
          ))}
      </>
    )
  }

  return (
    <Flex className={styles['Poster']} id="poster" justify="center" align="center" ref={posterRef}>
      <Row className={styles['Poster__container']}>
        <Col span={14} className={styles['Poster__leftSide']}>
          <div className={clsx(styles['Poster__title'], styles['Poster_text_default'])}>{title}</div>
          <div className={clsx(styles['Poster__description'], styles['Poster_text_default'])}>{description()}</div>
        </Col>
        <Col span={10} className={styles['Poster__rightSide']}>
          <div className={styles['Poster__imageWrapper']}>
            <img src={imageSrc} alt="poster image" />
          </div>
          <div className={clsx(styles['Poster__datetime'], styles['Poster_text_default'])}>
            <span>{date?.format('DD MMMM')}, {' '}</span>
            <span>{t('start')} {startTime?.format('HH:mm')}</span>
            <br />
            <span>{address}</span>
            <br />
            <span>{placeName}</span>
          </div>
        </Col>
      </Row>
      <Emojis />
    </Flex>
  )
}
