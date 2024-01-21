import { type Dayjs } from 'dayjs'

type State = {
  title?: string
  description?: React.ReactElement
  date?: Dayjs
  startTime?: Dayjs
  endTime?: Dayjs
  address?: string
  placeName?: string
  imageSrc?: string
  emojis?: string
}

export type Poster = State

export const enum ActionTypes {
  setTitile,
  setDescription,
  setDate,
  setStartTime,
  setEndTime,
  setAddress,
  setPlaceName,
  setImageSrc,
  setEmojis,
  rerender,
}

type Action = {
  type: ActionTypes
  payload: State[keyof State]
}

export function posterReducer(state: State, action: Action): State {
  if (action.type === ActionTypes.setTitile) {
    return {
      ...state,
      title: action.payload as string,
    }
  }
  if (action.type === ActionTypes.setDescription) {
    return {
      ...state,
      description: action.payload as React.ReactElement,
    }
  }
  if (action.type === ActionTypes.setDate) {
    return {
      ...state,
      date: action.payload as Dayjs,
    }
  }
  if (action.type === ActionTypes.setStartTime) {
    return {
      ...state,
      startTime: action.payload as Dayjs,
    }
  }
  if (action.type === ActionTypes.setEndTime) {
    return {
      ...state,
      endTime: action.payload as Dayjs,
    }
  }
  if (action.type === ActionTypes.setAddress) {
    return {
      ...state,
      address: action.payload as string,
    }
  }
  if (action.type === ActionTypes.setPlaceName) {
    return {
      ...state,
      placeName: action.payload as string,
    }
  }
  if (action.type === ActionTypes.setImageSrc) {
    return {
      ...state,
      imageSrc: action.payload as string,
    }
  }
  if (action.type === ActionTypes.setEmojis) {
    return {
      ...state,
      emojis: action.payload as string,
    }
  }
  if (action.type === ActionTypes.rerender) {
    return {
      ...state,
    }
  }
  throw Error('Unknown action.')
}
