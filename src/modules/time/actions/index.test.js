import * as timeActions from './index'

describe('addOpeningTime', () => {
  it('should create an action', () => {
    const actual = timeActions.addOpeningTime(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_OPENING_TIME,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addAdditionalOpeningTime', () => {
  it('should create an action', () => {
    const actual = timeActions.addAdditionalOpeningTime(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_ADDITIONAL_OPENING_TIME,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addSpecialOpeningTime', () => {
  it('should create an action', () => {
    const actual = timeActions.addSpecialOpeningTime(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_SPECIAL_OPENING_TIME,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addOpeningTimeClosure', () => {
  it('should create an action', () => {
    const actual = timeActions.addOpeningTimeClosure(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_OPENING_TIME_CLOSURE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addPerformance', () => {
  it('should create an action', () => {
    const actual = timeActions.addPerformance(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_PERFORMANCE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addAdditionalPerformance', () => {
  it('should create an action', () => {
    const actual = timeActions.addAdditionalPerformance(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_ADDITIONAL_PERFORMANCE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addSpecialPerformance', () => {
  it('should create an action', () => {
    const actual = timeActions.addSpecialPerformance(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_SPECIAL_PERFORMANCE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addPerformanceClosure', () => {
  it('should create an action', () => {
    const actual = timeActions.addPerformanceClosure(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_PERFORMANCE_CLOSURE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})

describe('addTimesRange', () => {
  it('should create an action', () => {
    const actual = timeActions.addTimesRange(
      { some: 'values' },
      'ParentFormName'
    )

    expect(actual).toEqual({
      type: timeActions.types.ADD_TIMES_RANGE,
      payload: { values: { some: 'values' }, parentFormName: 'ParentFormName' }
    })
  })
})
