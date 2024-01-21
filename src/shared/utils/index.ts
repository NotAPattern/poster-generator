import dayjs from 'dayjs'

export const getZareshkiDefaultDate = (givenDayNumber = 6) => {
  const currentDate = dayjs()
  const daysUntilGivenDayNumber = (givenDayNumber - currentDate.day() + 7) % 7

  return currentDate.add(daysUntilGivenDayNumber, 'day')
}
