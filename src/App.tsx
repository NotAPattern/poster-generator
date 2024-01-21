import { type FC, useReducer, useRef } from 'react'
import '@/shared/styles/index.sass'
import { Button, DatePicker, Flex, Input, TimePicker, Typography } from 'antd'
import dateLocale from 'antd/es/date-picker/locale/ru_RU'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'i18nano'
import styles from './App.module.sass'
import { Poster } from './Poster'
import { ActionTypes, posterReducer } from './posterReducer'
import 'dayjs/locale/ru'
import zareshki from '@/assets/zareshki.svg'
import html2canvas from 'html2canvas'

const { Title } = Typography

const Description = () => {
  return (
    <>
      <p>
        В свободном формате:
      </p>
      <ul>
        <li>решаем задачи</li>
        <li>проходим онлайн-курсы</li>
        <li>работаем над пет-проектами</li>
        <li>помогаем друг другу</li>
      </ul>
    </>
  )
}

const getZareshkiDefaultDate = (givenDayNumber = 6) => {
  const currentDate = dayjs()
  const daysUntilGivenDayNumber = (givenDayNumber - currentDate.day() + 7) % 7

  return currentDate.add(daysUntilGivenDayNumber, 'day')
}

const App: FC = () => {
  const t = useTranslation()
  const [poster, dispatch] = useReducer(posterReducer, {
    title: 'Суббота — день твоих проектов на Зарешках!',
    date: getZareshkiDefaultDate(),
    startTime: dayjs('15:00', 'HH:mm'),
    address: 'Маршала Жукова, 21',
    placeName: 'Точка Кипения',
    imageSrc: zareshki,
    emojis: '🧑‍💻 😮 👍 ☕ 👆 👩🏻‍💻 🖥️ ⌨️ 🛠️ ⚡',
  })

  const posterRef = useRef<HTMLDivElement>(null)

  const onChangeInputHandler = (type: ActionTypes) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type, payload: event.target.value })
    }
  }

  const onChangeDateHandler = (event: Dayjs | null) => {
    dispatch({ type: ActionTypes.setDate, payload: event !== null ? event : undefined })
  }

  const onChangeTimeHandler = (event: Dayjs | null) => {
    dispatch({ type: ActionTypes.setStartTime, payload: event !== null ? event : undefined })
  }

  const toEmojisArray = (emojis?: string) => {
    return emojis?.split(' ')
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
    <>
      <Flex vertical gap={10} className={styles['App__settings']} justify="center">
        <Title>{t('app-title')}</Title>
        <Input
          placeholder={t('placeholder-title')}
          value={poster.title}
          onChange={onChangeInputHandler(ActionTypes.setTitile)}
        />
        <DatePicker
          value={poster.date}
          onChange={onChangeDateHandler}
          format="DD-MM-YYYY"
          locale={dateLocale}
          placeholder={t('placeholder-date')}
        />
        <TimePicker
          value={poster.startTime}
          onChange={onChangeTimeHandler}
          format="HH:mm"
          placeholder={t('placeholder-time')}
        />
        <Input
          placeholder={t('placeholder-address')}
          value={poster.address}
          onChange={onChangeInputHandler(ActionTypes.setAddress)}
        />
        <Input
          placeholder={t('placeholder-place-name')}
          value={poster.placeName}
          onChange={onChangeInputHandler(ActionTypes.setPlaceName)}
        />
        <Input
          placeholder={t('placeholder-emojis')}
          value={poster.emojis}
          onChange={onChangeInputHandler(ActionTypes.setEmojis)}
        />
        <Button
          onClick={() => {
            dispatch({ type: ActionTypes.rerender, payload: '' })
          }}
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

      <Poster
        title={poster.title}
        description={Description}
        date={poster.date}
        startTime={poster.startTime}
        imageSrc={poster.imageSrc}
        address={poster.address}
        placeName={poster.placeName}
        emojis={toEmojisArray(poster.emojis)}
        posterRef={posterRef}
      />
    </>
  )
}

export default App
