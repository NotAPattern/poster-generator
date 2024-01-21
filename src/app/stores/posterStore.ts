import zareshki from '@/shared/assets/zareshki.svg'
import { getZareshkiDefaultDate } from '@/shared/utils'
import dayjs, { type Dayjs } from 'dayjs'
import { create } from 'zustand'

type Poster = {
  title?: string
  description?: React.ReactElement
  date?: Dayjs
  startTime?: Dayjs
  endTime?: Dayjs
  address?: string
  placeName?: string
  imageSrc?: string
  emojis?: string
  rerender: boolean
}

type PosterState = {
  poster: Poster
}

type PosterActions = {
  setTitle: (title: string) => void
  setDate: (date: Dayjs | undefined) => void
  setStartTime: (startTime: Dayjs | undefined) => void
  setEndTime: (endTime: Dayjs | undefined) => void
  setAddress: (address: string) => void
  setPlaceName: (placeName: string) => void
  setImageSrc: (imageSrc: string) => void
  setEmojis: (emojis: string | undefined) => void
  rerender: () => void
}

export const usePosterStore = create<PosterState & PosterActions>((set) => ({
  poster: {
    title: 'Суббота — день твоих проектов на Зарешках!',
    date: getZareshkiDefaultDate(),
    startTime: dayjs('15:00', 'HH:mm'),
    address: 'Маршала Жукова, 21',
    placeName: 'Точка Кипения',
    imageSrc: zareshki,
    emojis: '🧑‍💻 😮 👍 ☕ 👆 👩🏻‍💻 🖥️ ⌨️ 🛠️ ⚡',
    rerender: false,
  },
  setTitle: (title: string) => {
    set((state) => ({
      poster: {
        ...state.poster,
        title,
      },
    }))
  },
  setDate: (date: Dayjs | undefined) => {
    set((state) => ({
      poster: {
        ...state.poster,
        date,
      },
    }))
  },
  setStartTime: (startTime: Dayjs | undefined) => {
    set((state) => ({
      poster: {
        ...state.poster,
        startTime,
      },
    }))
  },
  setEndTime: (endTime: Dayjs | undefined) => {
    set((state) => ({
      poster: {
        ...state.poster,
        endTime,
      },
    }))
  },
  setAddress: (address: string) => {
    set((state) => ({
      poster: {
        ...state.poster,
        address,
      },
    }))
  },
  setPlaceName: (placeName: string) => {
    set((state) => ({
      poster: {
        ...state.poster,
        placeName,
      },
    }))
  },
  setImageSrc: (imageSrc: string) => {
    set((state) => ({
      poster: {
        ...state.poster,
        imageSrc,
      },
    }))
  },
  setEmojis: (emojis: string | undefined) => {
    set((state) => ({
      poster: {
        ...state.poster,
        emojis,
      },
    }))
  },
  rerender: () => {
    set((state) => ({
      poster: {
        ...state.poster,
        rerender: !state.poster.rerender,
      },
    }))
  },
}))
