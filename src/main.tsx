import { ru } from '@/shared/locales'
import { TranslationProvider } from 'i18nano'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'normalize.css'

const translations = {
  'en': async () => import('@/shared/locales/en.json'),
  'ru': async () => ru,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslationProvider translations={translations} language="ru" fallback="">
      <App />
    </TranslationProvider>
  </React.StrictMode>,
)
