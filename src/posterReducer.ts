import { type Dayjs } from 'dayjs'

type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`
type DateString = `${DD}-${MM}-${YYYY}`

type State = {
  title?: string
  description?: React.ReactElement
  date?: Dayjs
  startTime?: string
  endTime?: string
}

export type Poster = State

export const enum ActionTypes {
  setTitile,
  setDescription,
  setDate,
  setStartTime,
  setEndTime,
  setPlace,
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
      startTime: action.payload as string,
    }
  }
  if (action.type === ActionTypes.setEndTime) {
    return {
      ...state,
      endTime: action.payload as string,
    }
  }
  throw Error('Unknown action.')
}
