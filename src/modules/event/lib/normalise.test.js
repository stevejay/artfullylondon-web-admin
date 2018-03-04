import * as eventNormalise from './normalise'
import occurrenceType from '_src/domain/types/occurrence-type'
import eventType from '_src/domain/types/event-type'

describe('normaliseMoney', () => {
  it('should normalise a money value', () => {
    const actual = eventNormalise.normaliseMoney('  £23.34p ')
    expect(actual).toEqual('23.34')
  })
})

describe('normaliseEventValues', () => {
  it('should normalise an event with no date range', () => {
    const values = {
      occurrenceType: occurrenceType.CONTINUOUS,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.CONTINUOUS,
      dateFrom: null,
      dateTo: null,
      eventType: eventType.PERFORMANCE,
      useVenueOpeningTimes: false,
      openingTimes: [],
      additionalOpeningTimes: [],
      specialOpeningTimes: [],
      openingTimesClosures: [],
      performances: [],
      timesRanges: []
    })
  })

  it('should normalise an event with a date range that is valid', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE,
      openingTimes: [],
      additionalOpeningTimes: [],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      useVenueOpeningTimes: false
    })
  })

  it('should normalise a performance event with entries out of the date range', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE,
      additionalPerformances: [
        { date: '2017/03/03', at: '18:00' },
        { date: '2019/03/03', at: '18:00' }
      ],
      specialPerformances: [
        { date: '2017/03/03', at: '18:00' },
        { date: '2016/03/03', at: '18:00' }
      ],
      performancesClosures: [{ date: '2017/03/03' }, { date: '2019/03/03' }]
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE,
      openingTimes: [],
      additionalOpeningTimes: [],
      additionalPerformances: [{ date: '2017/03/03', at: '18:00' }],
      specialOpeningTimes: [],
      specialPerformances: [{ date: '2017/03/03', at: '18:00' }],
      openingTimesClosures: [],
      performancesClosures: [{ date: '2017/03/03' }],
      useVenueOpeningTimes: false
    })
  })

  it('should normalise an exhibition event with entries out of the date range', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      additionalOpeningTimes: [
        { date: '2017/03/03', from: '18:00', to: '19:00' },
        { date: '2019/03/03', from: '18:00', to: '19:00' }
      ],
      specialOpeningTimes: [
        { date: '2017/03/03', from: '18:00', to: '19:00' },
        { date: '2016/03/03', from: '18:00', to: '19:00' }
      ],
      openingTimesClosures: [{ date: '2017/03/03' }, { date: '2019/03/03' }]
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      performances: [],
      additionalOpeningTimes: [
        { date: '2017/03/03', from: '18:00', to: '19:00' }
      ],
      additionalPerformances: [],
      specialOpeningTimes: [{ date: '2017/03/03', from: '18:00', to: '19:00' }],
      specialPerformances: [],
      openingTimesClosures: [{ date: '2017/03/03' }],
      performancesClosures: []
    })
  })

  it('should normalise an event with a date range that is invalid', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2019/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2019/01/01',
      dateTo: '2019/01/01',
      eventType: eventType.PERFORMANCE,
      openingTimes: [],
      performances: [],
      additionalOpeningTimes: [],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      useVenueOpeningTimes: false,
      timesRanges: []
    })
  })

  it('should normalise an exhibition event that uses the venue opening times', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      useVenueOpeningTimes: true,
      openingTimes: [{ day: '1', from: '10:00', to: '18:00' }],
      timesRanges: [{ from: '2017/02/02' }]
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      useVenueOpeningTimes: true,
      openingTimes: [],
      performances: [],
      additionalOpeningTimes: [],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      timesRanges: []
    })
  })

  it('should normalise a single day exhibition event', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2017/01/01',
      eventType: eventType.EXHIBITION,
      additionalOpeningTimes: [
        { date: '2017/01/01', from: '10:00', to: '18:00' }
      ],
      openingTimesClosures: [{ date: '2017/01/01' }],
      timesRanges: [{ from: '2017/02/02' }]
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2017/01/01',
      eventType: eventType.EXHIBITION,
      openingTimes: [],
      performances: [],
      additionalOpeningTimes: [
        { date: '2017/01/01', from: '10:00', to: '18:00' }
      ],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      timesRanges: []
    })
  })

  it('should normalise an exhibition event with no times ranges', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      openingTimes: [
        { day: '1', from: '10:00', to: '18:00' },
        { day: '2', from: '10:00', to: '18:00', timesRangeId: '2017/05/05' }
      ],
      timesRanges: []
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.EXHIBITION,
      openingTimes: [
        { day: '1', from: '10:00', to: '18:00' },
        { day: '2', from: '10:00', to: '18:00' }
      ],
      performances: [],
      additionalOpeningTimes: [],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      timesRanges: []
    })
  })

  it('should normalise a one time performance event', () => {
    const values = {
      occurrenceType: occurrenceType.ONETIME,
      dateFrom: '2017/01/01',
      dateTo: '2017/01/01',
      eventType: eventType.PERFORMANCE,
      additionalPerformances: [
        { date: '2017/01/01', at: '16:00' },
        { date: '2017/01/01', at: '18:00' }
      ]
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.ONETIME,
      dateFrom: '2017/01/01',
      dateTo: '2017/01/01',
      eventType: eventType.PERFORMANCE,
      openingTimes: [],
      performances: [],
      additionalOpeningTimes: [],
      additionalPerformances: [{ date: '2017/01/01', at: '16:00' }],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      timesRanges: [],
      useVenueOpeningTimes: false
    })
  })

  it('should normalise a performance event', () => {
    const values = {
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE,
      performances: [
        { day: '1', at: '10:00' },
        { day: '2', at: '18:00', timesRangeId: '2017/05/05' }
      ],
      timesRanges: []
    }

    const actual = eventNormalise.normaliseEventValues(values)

    expect(values).toEqual({
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      eventType: eventType.PERFORMANCE,
      openingTimes: [],
      performances: [{ day: '1', at: '10:00' }, { day: '2', at: '18:00' }],
      additionalOpeningTimes: [],
      additionalPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      openingTimesClosures: [],
      performancesClosures: [],
      timesRanges: [],
      useVenueOpeningTimes: false
    })
  })
})
