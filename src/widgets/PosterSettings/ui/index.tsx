import { usePosterStore } from '@/app/stores/posterStore'
import { Button, DatePicker, Flex, Input, TimePicker, Typography } from 'antd'
import dateLocale from 'antd/es/date-picker/locale/ru_RU'
import { type Dayjs } from 'dayjs'
import html2canvas from 'html2canvas'
import { useTranslation } from 'i18nano'
import { type FC } from 'react'
import styles from './PosterSettings.module.sass'

const { Title } = Typography

type PosterSettingsProps = {
  posterRef: React.RefObject<HTMLDivElement>
}

export const PosterSettings: FC<PosterSettingsProps> = ({ posterRef }) => {
  const t = useTranslation()
  const title = usePosterStore((state) => state.poster.title)
  const date = usePosterStore((state) => state.poster.date)
  const startTime = usePosterStore((state) => state.poster.startTime)
  const address = usePosterStore((state) => state.poster.address)
  const placeName = usePosterStore((state) => state.poster.placeName)
  const emojis = usePosterStore((state) => state.poster.emojis)
  const setTitle = usePosterStore((state) => state.setTitle)
  const setDate = usePosterStore((state) => state.setDate)
  const setStartTime = usePosterStore((state) => state.setStartTime)
  const setPlaceName = usePosterStore((state) => state.setPlaceName)
  const setAddress = usePosterStore((state) => state.setAddress)
  const setEmojis = usePosterStore((state) => state.setEmojis)
  const rerender = usePosterStore((state) => state.rerender)

  const onChangeInputHandler = (type: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      eval(`set${type}("${event.target.value}")`)
    }
  }

  const onChangeDateHandler = (event: Dayjs | null) => {
    setDate(event !== null ? event : undefined)
  }

  const onChangeStartTimeHandler = (event: Dayjs | null) => {
    setStartTime(event !== null ? event : undefined)
  }

  const saveDivAsImage = async () => {
    if (posterRef.current) {
      const poster = posterRef.current
      try {
        const canvas = await html2canvas(poster)
        const imageData = canvas.toDataURL('image/png')

        const downloadLink = document.createElement('a')
        downloadLink.href = imageData
        downloadLink.download = 'screenshot.png'
        downloadLink.click()
      } catch (error) {
        console.error('Ошибка при сохранении изображения:', error)
      }
    }
  }

  const onSavePosterHandler = () => {
    saveDivAsImage()
  }

  return (
    <Flex vertical gap={10} className={styles['PosterSettings']} justify="center">
      <Title>{t('app-title')}</Title>
      <Input
        placeholder={t('placeholder-title')}
        value={title}
        onChange={onChangeInputHandler('Title')}
      />
      <DatePicker
        value={date}
        onChange={onChangeDateHandler}
        format="DD-MM-YYYY"
        locale={dateLocale}
        placeholder={t('placeholder-date')}
      />
      <TimePicker
        value={startTime}
        onChange={onChangeStartTimeHandler}
        format="HH:mm"
        placeholder={t('placeholder-time')}
      />
      <Input
        placeholder={t('placeholder-address')}
        value={address}
        onChange={onChangeInputHandler('Address')}
      />
      <Input
        placeholder={t('placeholder-place-name')}
        value={placeName}
        onChange={onChangeInputHandler('PlaceName')}
      />
      <Input
        placeholder={t('placeholder-emojis')}
        value={emojis}
        onChange={onChangeInputHandler('Emojis')}
      />
      <Button
        onClick={rerender}
      >
        {t('button-rerender')}
      </Button>
      <Button
        type="primary"
        onClick={onSavePosterHandler}
      >
        {t('button-download')}
      </Button>
    </Flex>
  )
}
