import * as timeLib from './time'

it('should perform formatDayNumberForDisplay on all days', () => {
  expect(timeLib.formatDayNumberForDisplay('0')).toEqual('Monday')
  expect(timeLib.formatDayNumberForDisplay('1')).toEqual('Tuesday')
  expect(timeLib.formatDayNumberForDisplay('2')).toEqual('Wednesday')
  expect(timeLib.formatDayNumberForDisplay('3')).toEqual('Thursday')
  expect(timeLib.formatDayNumberForDisplay('4')).toEqual('Friday')
  expect(timeLib.formatDayNumberForDisplay('5')).toEqual('Saturday')
  expect(timeLib.formatDayNumberForDisplay('6')).toEqual('Sunday')
})
