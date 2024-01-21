import { Col, Flex, Row } from 'antd'
import dayjs from 'dayjs'
import { type FC, useEffect, useState } from 'react'
import styles from './Poster.module.sass'
import 'dayjs/locale/ru'
import { PosterDatetime } from '@/entities/PosterDatetime/ui'
import { PosterDescription } from '@/entities/PosterDescription'
import { PosterEmojis } from '@/entities/PosterEmojis'
import { PosterImage } from '@/entities/PosterImage/ui'
import { PosterTitle } from '@/entities/PosterTitle'

dayjs.locale('ru')

type PosterProps = {
  posterRef: React.RefObject<HTMLDivElement>
}

export const Poster: FC<PosterProps> = (
  { posterRef },
) => {
  const [posterSize, setPosterSize] = useState<{ width: number; height: number } | undefined>(undefined)

  useEffect(() => {
    if (posterRef.current) {
      const poster = posterRef.current
      setPosterSize({ width: poster.clientWidth, height: poster.clientHeight })
    }
  }, [posterRef])

  return (
    <Flex className={styles['Poster']} id="poster" justify="center" align="center" ref={posterRef}>
      <Row className={styles['Poster__container']}>
        <Col span={14} className={styles['Poster__leftSide']}>
          <PosterTitle />
          <PosterDescription />
        </Col>
        <Col span={10} className={styles['Poster__rightSide']}>
          <PosterImage />
          <PosterDatetime />
        </Col>
      </Row>
      <PosterEmojis posterSize={posterSize} />
    </Flex>
  )
}
