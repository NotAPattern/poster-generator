import { type FC, useRef } from 'react'
import '@/shared/styles/index.sass'
import { Poster } from '@/widgets/Poster'
import { TranslationProvider } from 'i18nano'
import 'dayjs/locale/ru'
import { ru } from '@/shared/locales'
import { PosterSettings } from '@/widgets/PosterSettings'

const translations = {
  'en': async () => import('@/shared/locales/en.json'),
  'ru': async () => ru,
}

const App: FC = () => {
  const posterRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <TranslationProvider translations={translations} language="ru" fallback="">
        <PosterSettings posterRef={posterRef} />
        <Poster
          posterRef={posterRef}
        />
      </TranslationProvider>
    </>
  )
}

export default App
