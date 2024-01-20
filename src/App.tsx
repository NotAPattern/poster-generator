import { type FC, useReducer } from 'react'
import '@/shared/styles/index.sass'
import { DatePicker, Flex, Input, Typography } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'i18nano'
import styles from './App.module.sass'
import { Poster } from './Poster'
import { ActionTypes, posterReducer } from './posterReducer'
import 'dayjs/locale/ru'

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
  })

  const onChangeInputHandler = (type: ActionTypes) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type, payload: event.target.value })
    }
  }

  const onChangeDateHandler = (event: Dayjs | null) => {
    dispatch({ type: ActionTypes.setDate, payload: event !== null ? event : undefined })
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
          locale={{ ...locale, lang: { ...locale.lang } }}
        />
        {
          /* <Input
          placeholder={t('placeholder-description')}
          onChange={onChangeInputHandler(ActionTypes.setDescription)}
          value={poster.description}
        >
        </Input> */
        }
      </Flex>

      <Poster title={poster.title} description={Description} date={poster.date} />
    </>
  )
}

export default App
