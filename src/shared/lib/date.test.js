import moment from 'moment'

import * as dateLib from './date'

describe('getPartsOfStringDate', () => {
  it('should get the parts of a valid date', () => {
    const actual = dateLib.getPartsOfStringDate('2017/01/18')

    expect(actual).toEqual({
      year: '2017',
      month: '01',
      day: '18'
    })
  })

  it('should throw when getting the parts of an valid date', () => {
    expect(() => dateLib.getPartsOfStringDate('foo')).toThrowError(
      "failed to parse 'foo' as date"
    )
  })
})

describe('getYearNow', () => {
  it('should get the year now', () => {
    const actual = dateLib.getYearNow()
    expect(actual).toBeGreaterThan(2017)
  })
})

describe('mapJsDateToStringDate', () => {
  const tests = [
    {
      arg: new Date(0),
      expected: '1970/01/01'
    },
    {
      arg: null,
      expected: null
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = dateLib.mapJsDateToStringDate(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('mapMomentDateToStringDate', () => {
  it('should handle a null moment', () => {
    const actual = dateLib.mapMomentDateToStringDate(null)
    expect(actual).toEqual(null)
  })

  it('should handle a valid moment', () => {
    const actual = dateLib.mapMomentDateToStringDate(moment(1517788800000))
    expect(actual).toEqual('2018/02/05')
  })
})

describe('mapStringDateToJsDate', () => {
  const tests = [
    { arg: '2018/02/18', expected: 1518912000000 },
    { arg: null, expected: null },
    { arg: '', expected: null }
  ]

  tests.forEach(test => {
    it(`should return a date with epoch ${test.expected} for string '${test.arg}'`, () => {
      const actual = dateLib.mapStringDateToJsDate(test.arg)

      if (test.expected === null) {
        expect(actual).toEqual(null)
      } else {
        expect(actual.getTime()).toEqual(test.expected)
      }
    })
  })
})

describe('getTodayDateAsString', () => {
  it('should return a string in a valid format', () => {
    const actual = dateLib.getTodayDateAsString()
    expect(actual).toEqual(expect.stringMatching(/^20\d\d\/\d\d\/\d\d$/))
  })
})

describe('periodIsLongerThanWeek', () => {
  const tests = [
    {
      it: 'should handle period equal to week',
      args: {
        dateFrom: '2017/01/20',
        dateTo: '2017/01/26'
      },
      expected: false
    },
    {
      it: 'should handle period longer than a week',
      args: {
        dateFrom: '2017/01/20',
        dateTo: '2017/01/27'
      },
      expected: true
    },
    {
      it: 'should handle period longer than a week that straddles a year',
      args: {
        dateFrom: '2016/12/30',
        dateTo: '2017/01/10'
      },
      expected: true
    },
    {
      it: 'should handle period less than a week that straddles a year',
      args: {
        dateFrom: '2016/12/30',
        dateTo: '2017/01/02'
      },
      expected: false
    },
    {
      it: 'should handle same day period',
      args: {
        dateFrom: '2017/01/20',
        dateTo: '2017/01/20'
      },
      expected: false
    },
    {
      it: 'should handle null date from',
      args: {
        dateFrom: null,
        dateTo: '2017/01/20'
      },
      expected: false
    },
    {
      it: 'should handle null date to',
      args: {
        dateFrom: '2017/01/20',
        dateTo: null
      },
      expected: false
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const actual = dateLib.periodIsLongerThanWeek(
        test.args.dateFrom,
        test.args.dateTo
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createTimeKey', () => {
  const tests = [
    {
      it: 'should handle date obj with time period',
      arg: { date: new Date(13287634233), from: '16:00', to: '18:00' },
      expected: '1970/06/03-16:00-18:00'
    },
    {
      it: 'should handle date obj with time',
      arg: { date: new Date(13287634233), at: '16:00' },
      expected: '1970/06/03-16:00'
    },
    {
      it: 'should handle string date with time period',
      arg: { date: '2017/01/20', from: '16:00', to: '18:00' },
      expected: '2017/01/20-16:00-18:00'
    },
    {
      it: 'should handle string date with time',
      arg: { date: '2017/01/20', at: '16:00' },
      expected: '2017/01/20-16:00'
    },
    {
      it: 'should handle day with time period',
      arg: { day: '2', from: '16:00', to: '18:00' },
      expected: '2-16:00-18:00'
    },
    {
      it: 'should handle day with time',
      arg: { day: '2', at: '16:00' },
      expected: '2-16:00'
    },
    {
      it: 'should handle string date with no time',
      arg: { date: '2017/01/20' },
      expected: '2017/01/20'
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const actual = dateLib.createTimeKey(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('formatDateRangeForDisplay', () => {
  const tests = [
    {
      args: { from: '2018/01/01', to: '2018/01/01' },
      expected: '1st Jan 2018'
    },
    {
      args: { from: '2018/01/01', to: '2018/01/02' },
      expected: '1st to 2nd Jan 2018'
    },
    {
      args: { from: '2018/01/01', to: '2018/02/01' },
      expected: '1st Jan to 1st Feb 2018'
    },
    {
      args: { from: '2018/01/01', to: '2019/01/01' },
      expected: '1st Jan 2018 to 1st Jan 2019'
    }
  ]

  tests.forEach(test => {
    it(`should return '${test.expected}' for args '${test.args.from}' and '${test.args.to}'`, () => {
      const actual = dateLib.formatDateRangeForDisplay(
        test.args.from,
        test.args.to
      )
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('formatStringDateForDisplay', () => {
  const tests = [
    {
      args: {
        date: new Date(0),
        includeDayName: false
      },
      expected: '1st Jan 1970'
    },
    {
      args: {
        date: new Date(0),
        includeDayName: true
      },
      expected: 'Thursday, 1st Jan 1970'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = dateLib.formatStringDateForDisplay(
        test.args.date,
        test.args.includeDayName
      )

      expect(actual).toEqual(test.expected)
    })
  })
})
