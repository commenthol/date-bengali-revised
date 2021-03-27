import assert from 'assert'
import {
  digitToBangla,
  banglaToDigit,
  monthName
} from '../src/convert.js'

const monthNames = [
  ['বৈশাখ', 1],
  ['জ্যৈষ্ঠ', 2],
  ['আষাঢ়', 3],
  ['শ্রাবণ', 4],
  ['ভাদ্র', 5],
  ['আশ্বিন', 6],
  ['কার্তিক', 7],
  ['অগ্রহায়ণ', 8],
  ['পৌষ', 9],
  ['মাঘ', 10],
  ['ফাল্গুন', 11],
  ['চৈত্র', 12]
]

describe('#convert', function () {
  const tests = [
    [0, '০'],
    [12, '১২'],
    [345, '৩৪৫'],
    [6789, '৬৭৮৯'],
    [1234567890, '১২৩৪৫৬৭৮৯০']
  ]

  describe('shall convert digits to bangla', function () {
    tests.forEach(([digit, exp]) => {
      it(`${digit} -> ${exp}`, function () {
        const res = digitToBangla(digit)
        assert.strictEqual(res, exp)
      })
    })
  })

  describe('shall convert bangla to digits', function () {
    tests.forEach(([exp, bangla]) => {
      it(`${bangla} -> ${exp}`, function () {
        const res = banglaToDigit(bangla)
        assert.strictEqual(res, exp)
      })
    })
  })

  describe('shall ignore digits', function () {
    const tests = [
      [0, 0],
      [12, 12],
      [345, 345],
      [6789, '6789'],
      [1234567890, '1234567890']
    ]
    tests.forEach(([exp, bangla]) => {
      it(`${bangla} -> ${exp}`, function () {
        const res = banglaToDigit(bangla)
        assert.strictEqual(res, exp)
      })
    })
  })

  describe('shall convert bangla month/ number names to number', function () {
    const tests = [].concat(monthNames, [['১২৩৪৫৬৭৮৯০', 1234567890]])
    tests.forEach(([bangla, exp]) => {
      it(`${bangla} -> ${exp}`, function () {
        const res = banglaToDigit(bangla)
        assert.strictEqual(res, exp)
      })
    })
  })

  describe('shall convert month to name', function () {
    const tests = [].concat(monthNames)
    tests.forEach(([exp, digit]) => {
      it(`${digit} -> ${exp}`, function () {
        const res = monthName(digit)
        assert.strictEqual(res, exp)
      })
    })
  })
})
