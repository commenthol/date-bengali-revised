import assert from 'assert'
import Calendar from '../src/index.js'

describe('#CalendarBengaliRevised', function () {
  const tests = [
    [[593, 4, 14], [0, 1, 1], ['০', 'বৈশাখ', '১']],
    [[2018, 4, 14], [1425, 1, 1], ['১৪২৫', 'বৈশাখ', '১']],
    [[2018, 4, 13], [1424, 12, 30], ['১৪২৪', 'চৈত্র', '৩০']],
    [[2016, 3, 14], [1422, 11, 31], ['১৪২২', 'ফাল্গুন', '৩১']], // leap year
    [[2017, 3, 14], [1423, 11, 30], ['১৪২৩', 'ফাল্গুন', '৩০']], // non leap year
    [[592, 4, 14], [-1, 1, 1], ['-১', 'বৈশাখ', '১']],
    [[592, 4, 13], [-2, 12, 30], ['-২', 'চৈত্র', '৩০']]
  ]

  describe('shall convert from gregorian to bengali date', function () {
    tests.forEach(([greg, bangla]) => {
      it(greg.join('-') + ' -> ' + bangla.join('.'), function () {
        const [gyear, gmonth, gday] = greg
        const [year, month, day] = bangla
        const cal = new Calendar()
        cal.fromGregorian(gyear, gmonth, gday)
        assert.strictEqual(cal.year, year, 'not same year')
        assert.strictEqual(cal.month, month, 'not same month')
        assert.strictEqual(cal.day, day, 'not same day')
      })
    })
  })

  describe('shall convert from bengali to gregorian date', function () {
    tests.forEach(([greg, bangla]) => {
      it(bangla.join('.') + ' -> ' + greg.join('-'), function () {
        const [gyear, gmonth, gday] = greg
        const [year, month, day] = bangla
        const cal = new Calendar(year, month, day)
        const gc = cal.toGregorian()
        assert.strictEqual(gc.year, gyear, 'not same year')
        assert.strictEqual(gc.month, gmonth, 'not same month')
        assert.strictEqual(gc.day, gday, 'not same day')
      })
    })
  })

  describe('shall convert from gregorian to bengali date using Date', function () {
    tests.forEach(([greg, bangla]) => {
      it(greg.join('-') + ' -> ' + bangla.join('.'), function () {
        const [gyear, gmonth, gday] = greg
        const [year, month, day] = bangla
        const cal = new Calendar()
        const date = new Date(gyear, gmonth - 1, gday)
        cal.fromDate(date)
        assert.strictEqual(cal.year, year, 'not same year')
        assert.strictEqual(cal.month, month, 'not same month')
        assert.strictEqual(cal.day, day, 'not same day')
      })
    })
  })

  describe('shall convert from bengali to gregorian date returning Date', function () {
    tests.forEach(([greg, bangla]) => {
      it(bangla.join('.') + ' -> ' + greg.join('-'), function () {
        const [gyear, gmonth, gday] = greg
        const [year, month, day] = bangla
        const cal = new Calendar(year, month, day)
        const date = cal.toDate()
        assert.strictEqual(date.getFullYear(), gyear, 'not same year')
        assert.strictEqual(date.getMonth() + 1, gmonth, 'not same month')
        assert.strictEqual(date.getDate(), gday, 'not same day')
      })
    })
  })

  describe('shall convert from bengali format to gregorian date', function () {
    tests.forEach(([greg, _, bangla]) => {
      it(bangla.join(' ') + ' -> ' + greg.join('-'), function () {
        const [gyear, gmonth, gday] = greg
        const [year, month, day] = bangla
        // console.log([digitToBangla(year), monthName(month), digitToBangla(day)])
        const cal = new Calendar(year, month, day)
        const gc = cal.toGregorian()
        assert.strictEqual(gc.year, gyear, 'not same year')
        assert.strictEqual(gc.month, gmonth, 'not same month')
        assert.strictEqual(gc.day, gday, 'not same day')
      })
    })
  })

  describe('shall format date', function () {
    const tests = [
      [[1425, 1, 1], undefined, '১ ১, ১৪২৫'],
      [[1425, 1, 1], 'Y', '১৪২৫'],
      [[1425, 1, 1], 'Q', 'গ্রীষ্ম'],
      [[1425, 1, 1], 'M', '১'],
      [[1425, 1, 1], 'MMMM', 'বৈশাখ'],
      [[1425, 1, 1], 'D', '১'],
      [[1425, 1, 1], 'dddd', 'শনিবার'],
      [[1424, 12, 30], 'dddd D MMMM, Y', 'শুক্রবার ৩০ চৈত্র, ১৪২৪']
    ]
    tests.forEach(([date, formatStr, exp]) => {
      it(`${date.join('.')} "${formatStr}" -> "${exp}"`, function () {
        const [year, month, day] = date
        const cal = new Calendar(year, month, day)
        const res = cal.format(formatStr)
        assert.strictEqual(res, exp)
      })
    })
  })
})
