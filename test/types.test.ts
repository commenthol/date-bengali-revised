import Calendar, { CalendarBengaliRevised } from 'date-bengali-revised'

const calendar: CalendarBengaliRevised = new Calendar()
const converted: CalendarBengaliRevised = calendar.fromGregorian(2018, 4, 14)
const gregorian: { year: number; month: number; day: number } =
  calendar.toGregorian()
const date: Date = calendar.toDate()
const formatted: string = calendar.format('Y')

void [converted, gregorian, date, formatted]
