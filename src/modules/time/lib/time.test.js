import * as timeLib from './time'

describe('formatDayNumberForDisplay', () => {
  it('should perform formatDayNumberForDisplay on all days', () => {
    expect(timeLib.formatDayNumberForDisplay('0')).toEqual('Monday')
    expect(timeLib.formatDayNumberForDisplay('1')).toEqual('Tuesday')
    expect(timeLib.formatDayNumberForDisplay('2')).toEqual('Wednesday')
    expect(timeLib.formatDayNumberForDisplay('3')).toEqual('Thursday')
    expect(timeLib.formatDayNumberForDisplay('4')).toEqual('Friday')
    expect(timeLib.formatDayNumberForDisplay('5')).toEqual('Saturday')
    expect(timeLib.formatDayNumberForDisplay('6')).toEqual('Sunday')
  })
})

describe('getTimesRangesOptions', () => {
  it('should get options for a non-empty value', () => {
    const actual = timeLib.getTimesRangesOptions([{ dateFrom: '2017/01/01' }])
    expect(actual).toEqual([{ value: '2017/01/01', label: 'From 2017/01/01' }])
  })

  it('should get options for no value', () => {
    const actual = timeLib.getTimesRangesOptions(null)
    expect(actual).toEqual([])
  })
})
