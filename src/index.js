/**
 * @copyright 2018-present commenthol
 * @license MIT
 */

import {
  banglaToDigit,
  digitToBangla,
  weekDay,
  monthName,
  seasonName
} from './convert.js'

const YEAR0 = 593
const MILLISECONDS_PER_DAY = 86400000
const monthDaysNorm = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]
const monthDaysLeap = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 31, 30]

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const UTC6 = 6 // timezone offset UTC+6
const toEpoch = (year) => Date.UTC(year, 3, 13, UTC6)

export class CalendarBengaliRevised {
  /**
   * @param {number|string} [year] - bengali year
   * @param {number|string} [month] - (int) 1...12
   * @param {number|string} [day] - 1...31
   */
  constructor(year, month, day) {
    /** @type {number} */
    this.year = banglaToDigit(year)
    /** @type {number} */
    this.month = banglaToDigit(month) || 1
    /** @type {number} */
    this.day = banglaToDigit(day) || 1
  }

  /**
   * convert gregorian date to bengali calendar date
   * @param {number} year - (int) year in Gregorian Calendar
   * @param {number} month - (int)
   * @param {number} day - (int)
   * @returns {this}
   */
  fromGregorian(year, month, day) {
    const monthDays = isLeapYear(year) ? monthDaysLeap : monthDaysNorm

    let _year = year
    if (month < 4 || (month === 4 && day < 14)) {
      _year -= 1
    }
    this.year = _year - YEAR0

    const date = Date.UTC(year, month - 1, day, UTC6)
    let days = Math.floor((date - toEpoch(_year)) / MILLISECONDS_PER_DAY)

    for (let i = 0; i < monthDays.length; i++) {
      if (days <= monthDays[i]) {
        this.month = i + 1
        break
      }
      days -= monthDays[i]
    }

    this.day = days
    return this
  }

  /**
   * convert date to bengali calendar date
   * @param {Date} date - javascript date object - uses local date
   * @returns {this}
   */
  fromDate(date) {
    return this.fromGregorian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )
  }

  /**
   * convert bengali date to gregorian date
   * @returns {{ year: number, month: number, day: number }} date in gregorian (preleptic) calendar
   */
  toGregorian() {
    const date = this.toDate()
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    }
  }

  /**
   * convert bengali date to Date
   * @return {Date} javascript date object in gregorian (preleptic) calendar
   */
  toDate() {
    const year = this.year + YEAR0
    const epoch = toEpoch(year)
    const _year = this.month > 10 ? year + 1 : year
    const monthDays = isLeapYear(_year) ? monthDaysLeap : monthDaysNorm

    let days = this.day
    for (let i = 0; i < this.month - 1; i++) {
      days += monthDays[i]
    }
    const date = new Date(days * MILLISECONDS_PER_DAY + epoch)
    return date
  }

  /**
   * format date in bengali
   * @param {string} [formatStr] - string formatter
   *
   * | Input | Description  |
   * | ----- | ------------ |
   * | Y     | Year with any number of digits and sign |
   * | Q     | Season Name  |
   * | M     | Month number |
   * | MMMM  | Month name   |
   * | D     | Day of month |
   * | dddd  | Day name     |
   *
   * @return {string}
   */
  format(formatStr) {
    formatStr = formatStr || 'D M, Y'
    if (/dddd/.test(formatStr)) {
      const date = this.toDate()
      formatStr = formatStr.replace(/dddd/g, weekDay(date.getUTCDay()))
    }
    return formatStr
      .replace(/Y/g, digitToBangla(this.year))
      .replace(/Q/g, seasonName(this.month))
      .replace(/MMMM/g, monthName(this.month))
      .replace(/M/g, digitToBangla(this.month))
      .replace(/D/g, digitToBangla(this.day))
  }
}

export default CalendarBengaliRevised
