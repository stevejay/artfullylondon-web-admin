import * as eventMapper from './mapper'
import { entityMapper } from '_src/modules/entity'
import statusType from '_src/domain/types/status-type'
import linkType from '_src/domain/types/link-type'
import venueType from '_src/domain/types/venue-type'
import eventType from '_src/domain/types/event-type'
import occurrenceType from '_src/domain/types/occurrence-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import eventSeriesType from '_src/domain/types/event-series-type'
import entityType from '_src/domain/types/entity-type'

describe('mapSubmittedValues', () => {
  it('should map the values', () => {
    entityMapper.mapSubmittedImages = jest
      .fn()
      .mockReturnValue([{ id: '1111' }])

    entityMapper.mapSubmittedLinks = jest
      .fn()
      .mockReturnValue([{ type: linkType.WIKIPEDIA }])

    entityMapper.mapSubmittedDescription = jest
      .fn()
      .mockReturnValue('Mapped description')

    const values = {
      id: 'some-event-id',
      status: statusType.ACTIVE,
      eventType: eventType.PERFORMANCE,
      name: 'Event Name',
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      soldOut: true,
      costType: costType.PAID,
      costFrom: '22.00',
      costTo: '33.00',
      bookingType: bookingType.REQUIRED,
      bookingOpens: '2016/01/01',
      summary: 'The Summary',
      rating: '2',
      minAge: '16',
      maxAge: '99',
      eventSeries: {
        entityType: entityType.EVENT_SERIES,
        eventSeriesType: eventSeriesType.OCCASIONAL,
        id: 'some-event-series-id',
        name: 'The Event Series Name'
      },
      venue: {
        entityType: entityType.VENUE,
        status: statusType.ACTIVE,
        venueType: venueType.THEATRE,
        id: 'some-venue-id',
        name: 'The Venue Name',
        address: 'The Venue Address',
        postcode: 'N6 4TT'
      },
      venueGuidance: 'The Venue Guidance',
      useVenueOpeningTimes: false,
      timesRanges: [
        {
          id: 'the-id',
          label: 'The label',
          dateFrom: '2017/02/02',
          dateTo: '2017/03/03',
          key: 'the-id'
        }
      ],
      openingTimes: [
        { day: '2', from: '18:00', to: '19:00', key: '2-18:00-19:00' }
      ],
      additionalOpeningTimes: [
        {
          date: '2017/03/03',
          from: '18:00',
          to: '19:00',
          key: '2017/03/03-18:00-19:00'
        }
      ],
      specialOpeningTimes: [
        {
          date: '2017/04/04',
          from: '18:00',
          to: '19:00',
          key: '2017/04/04-18:00-19:00',
          audienceTags: []
        }
      ],
      openingTimesClosures: [{ date: '2017/05/05', key: '2017/05/05' }],
      performances: [{ day: '3', at: '15:00', key: '3-15:00' }],
      additionalPerformances: [
        { date: '2017/06/06', at: '15:00', key: '2017/06/06-15:00' }
      ],
      specialPerformances: [
        {
          date: '2017/07/07',
          at: '15:00',
          key: '2017/07/07-15:00',
          audienceTags: []
        }
      ],
      performancesClosures: [{ date: '2017/08/08', key: '2017/08/08' }],
      duration: '2:30',
      talents: [
        {
          id: 'some-talent-id',
          lastName: 'Last Name',
          roles: 'Role One, Role Two',
          characters: 'Character One, Character Two',
          key: 'some-talent-id'
        }
      ],
      audienceTags: [{ id: 'audience/families', labels: 'families' }],
      mediumTags: [{ id: 'medium/sculpture', labels: 'sculpture' }],
      styleTags: [{ id: 'style/sixties', labels: 'sixties' }],
      geoTags: [{ id: 'geo/usa', labels: 'usa' }],
      reviews: [{}],
      soldOutPerformances: [
        {
          date: '2018/01/01',
          at: '18:00',
          key: '2018/01/01-18:00'
        }
      ],
      description: 'Description',
      descriptionCredit: 'Description Credit',
      links: [{ type: linkType.WIKIPEDIA, key: linkType.WIKIPEDIA }],
      images: [
        {
          id: '1111',
          key: '1111',
          isMain: true,
          previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg'
        }
      ],
      weSay: 'We Say',
      version: 100
    }

    const actual = eventMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      status: statusType.ACTIVE,
      eventType: eventType.PERFORMANCE,
      name: 'Event Name',
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      soldOut: true,
      costType: costType.PAID,
      costFrom: 22,
      costTo: 33,
      bookingType: bookingType.REQUIRED,
      bookingOpens: '2016/01/01',
      summary: 'The Summary',
      rating: 2,
      minAge: 16,
      maxAge: 99,
      eventSeriesId: 'some-event-series-id',
      venueId: 'some-venue-id',
      venueGuidance: 'The Venue Guidance',
      useVenueOpeningTimes: false,
      timesRanges: [
        {
          id: 'the-id',
          label: 'The label',
          dateFrom: '2017/02/02',
          dateTo: '2017/03/03'
        }
      ],
      openingTimes: [{ day: 2, from: '18:00', to: '19:00' }],
      additionalOpeningTimes: [
        { date: '2017/03/03', from: '18:00', to: '19:00' }
      ],
      specialOpeningTimes: [
        { date: '2017/04/04', from: '18:00', to: '19:00', audienceTags: [] }
      ],
      openingTimesClosures: [{ date: '2017/05/05' }],
      performances: [{ day: 3, at: '15:00' }],
      additionalPerformances: [{ date: '2017/06/06', at: '15:00' }],
      specialPerformances: [
        { date: '2017/07/07', at: '15:00', audienceTags: [] }
      ],
      performancesClosures: [{ date: '2017/08/08' }],
      duration: '2:30',
      talents: [
        {
          id: 'some-talent-id',
          roles: ['Role One', 'Role Two'],
          characters: ['Character One', 'Character Two']
        }
      ],
      audienceTags: [{ id: 'audience/families', labels: 'families' }],
      mediumTags: [{ id: 'medium/sculpture', labels: 'sculpture' }],
      styleTags: [{ id: 'style/sixties', labels: 'sixties' }],
      geoTags: [{ id: 'geo/usa', labels: 'usa' }],
      soldOutPerformances: [
        {
          date: '2018/01/01',
          at: '18:00'
        }
      ],
      descriptionCredit: 'Description Credit',
      weSay: 'We Say',
      version: 101,
      description: 'Mapped description',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }]
    })
  })

  it('should map minimum values', () => {
    entityMapper.mapSubmittedImages = jest
      .fn()
      .mockReturnValue([{ id: '1111' }])

    entityMapper.mapSubmittedLinks = jest
      .fn()
      .mockReturnValue([{ type: linkType.WIKIPEDIA }])

    entityMapper.mapSubmittedDescription = jest
      .fn()
      .mockReturnValue('Mapped description')

    const values = {
      venue: {},
      eventSeries: {},
      version: 100
    }

    const actual = eventMapper.mapSubmittedValues(values)

    expect(actual).toEqual({
      additionalOpeningTimes: [],
      additionalPerformances: [],
      bookingOpens: null,
      costFrom: null,
      costTo: null,
      dateFrom: null,
      dateTo: null,
      description: 'Mapped description',
      descriptionCredit: '',
      duration: '',
      eventSeriesId: null,
      images: [{ id: '1111' }],
      links: [{ type: 'Wikipedia' }],
      maxAge: null,
      minAge: null,
      name: '',
      openingTimes: [],
      openingTimesClosures: [],
      performances: [],
      performancesClosures: [],
      rating: NaN,
      soldOutPerformances: [],
      specialOpeningTimes: [],
      specialPerformances: [],
      summary: '',
      talents: [],
      timesRanges: [],
      venueGuidance: '',
      venueId: null,
      version: 101,
      weSay: ''
    })
  })
})

describe('getInitialValues', () => {
  it('should handle getting initial values for a new minimal event', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Rich Text Description')

    const entity = {}

    const actual = eventMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: null,
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      eventType: '',
      name: '',
      occurrenceType: '',
      dateFrom: null,
      dateTo: null,
      soldOut: false,
      costType: '',
      costFrom: '',
      costTo: '',
      bookingType: '',
      bookingOpens: null,
      summary: '',
      rating: '3',
      minAge: '',
      maxAge: '',
      eventSeries: {},
      venue: {},
      venueGuidance: '',
      useVenueOpeningTimes: false,
      timesRanges: [],
      openingTimes: [],
      additionalOpeningTimes: [],
      specialOpeningTimes: [],
      openingTimesClosures: [],
      performances: [],
      additionalPerformances: [],
      specialPerformances: [],
      performancesClosures: [],
      duration: '',
      talents: [],
      audienceTags: [],
      mediumTags: [],
      styleTags: [],
      geoTags: [],
      reviews: [],
      soldOutPerformances: [],
      description: 'Rich Text Description',
      descriptionCredit: '',
      links: [],
      images: [],
      weSay: '',
      version: 0
    })
  })

  it('should handle getting initial values for an existing performance', () => {
    entityMapper.getValidStatusesInitialValue = jest
      .fn()
      .mockReturnValue(['Status A'])

    entityMapper.getRichTextInitialValue = jest
      .fn()
      .mockReturnValue('Rich Text Description')

    const entity = {
      id: 'some-event-id',
      status: statusType.ACTIVE,
      eventType: eventType.PERFORMANCE,
      name: 'Event Name',
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      soldOut: true,
      costType: costType.PAID,
      costFrom: 22,
      costTo: 33,
      bookingType: bookingType.REQUIRED,
      bookingOpens: '2016/01/01',
      summary: 'The Summary',
      rating: 2,
      minAge: 16,
      maxAge: 99,
      eventSeries: {
        entityType: entityType.EVENT_SERIES,
        eventSeriesType: eventSeriesType.OCCASIONAL,
        id: 'some-event-series-id',
        name: 'The Event Series Name'
      },
      venue: {
        entityType: entityType.VENUE,
        status: statusType.ACTIVE,
        venueType: venueType.THEATRE,
        id: 'some-venue-id',
        name: 'The Venue Name',
        address: 'The Venue Address',
        postcode: 'N6 4TT'
      },
      venueGuidance: 'The Venue Guidance',
      useVenueOpeningTimes: false,
      timesRanges: [
        {
          id: 'the-id',
          label: 'The label',
          dateFrom: '2017/02/02',
          dateTo: '2017/03/03'
        }
      ],
      openingTimes: [{ day: 2, from: '18:00', to: '19:00' }],
      additionalOpeningTimes: [
        { date: '2017/03/03', from: '18:00', to: '19:00' }
      ],
      specialOpeningTimes: [{ date: '2017/04/04', from: '18:00', to: '19:00' }],
      openingTimesClosures: [{ date: '2017/05/05' }],
      performances: [{ day: 3, at: '15:00' }],
      additionalPerformances: [{ date: '2017/06/06', at: '15:00' }],
      specialPerformances: [{ date: '2017/07/07', at: '15:00' }],
      performancesClosures: [{ date: '2017/08/08' }],
      duration: '2:30',
      talents: [
        {
          id: 'some-talent-id',
          lastName: 'Last Name',
          roles: ['Role One', 'Role Two'],
          characters: ['Character One', 'Character Two']
        }
      ],
      audienceTags: [{ id: 'audience/families', labels: 'families' }],
      mediumTags: [{ id: 'medium/sculpture', labels: 'sculpture' }],
      styleTags: [{ id: 'style/sixties', labels: 'sixties' }],
      geoTags: [{ id: 'geo/usa', labels: 'usa' }],
      reviews: [{}],
      soldOutPerformances: [
        {
          date: '2018/01/01',
          at: '18:00'
        }
      ],
      description: 'Some Description',
      descriptionCredit: 'Description Credit',
      links: [{ type: linkType.WIKIPEDIA }],
      images: [{ id: '1111' }],
      weSay: 'We Say',
      version: 100
    }

    const actual = eventMapper.getInitialValues(entity)

    expect(actual).toEqual({
      id: 'some-event-id',
      status: statusType.ACTIVE,
      validStatuses: ['Status A'],
      eventType: eventType.PERFORMANCE,
      name: 'Event Name',
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2017/01/01',
      dateTo: '2018/01/01',
      soldOut: true,
      costType: costType.PAID,
      costFrom: '22.00',
      costTo: '33.00',
      bookingType: bookingType.REQUIRED,
      bookingOpens: '2016/01/01',
      summary: 'The Summary',
      rating: '2',
      minAge: '16',
      maxAge: '99',
      eventSeries: {
        entityType: entityType.EVENT_SERIES,
        eventSeriesType: eventSeriesType.OCCASIONAL,
        id: 'some-event-series-id',
        name: 'The Event Series Name'
      },
      venue: {
        entityType: entityType.VENUE,
        status: statusType.ACTIVE,
        venueType: venueType.THEATRE,
        id: 'some-venue-id',
        name: 'The Venue Name',
        address: 'The Venue Address',
        postcode: 'N6 4TT'
      },
      venueGuidance: 'The Venue Guidance',
      useVenueOpeningTimes: false,
      timesRanges: [
        {
          id: 'the-id',
          label: 'The label',
          dateFrom: '2017/02/02',
          dateTo: '2017/03/03',
          key: 'the-id'
        }
      ],
      openingTimes: [
        { day: '2', from: '18:00', to: '19:00', key: '2-18:00-19:00' }
      ],
      additionalOpeningTimes: [
        {
          date: '2017/03/03',
          from: '18:00',
          to: '19:00',
          key: '2017/03/03-18:00-19:00'
        }
      ],
      specialOpeningTimes: [
        {
          date: '2017/04/04',
          from: '18:00',
          to: '19:00',
          key: '2017/04/04-18:00-19:00',
          audienceTags: []
        }
      ],
      openingTimesClosures: [{ date: '2017/05/05', key: '2017/05/05' }],
      performances: [{ day: '3', at: '15:00', key: '3-15:00' }],
      additionalPerformances: [
        { date: '2017/06/06', at: '15:00', key: '2017/06/06-15:00' }
      ],
      specialPerformances: [
        {
          date: '2017/07/07',
          at: '15:00',
          key: '2017/07/07-15:00',
          audienceTags: []
        }
      ],
      performancesClosures: [{ date: '2017/08/08', key: '2017/08/08' }],
      duration: '2:30',
      talents: [
        {
          id: 'some-talent-id',
          lastName: 'Last Name',
          roles: 'Role One, Role Two',
          characters: 'Character One, Character Two',
          key: 'some-talent-id'
        }
      ],
      audienceTags: [{ id: 'audience/families', labels: 'families' }],
      mediumTags: [{ id: 'medium/sculpture', labels: 'sculpture' }],
      styleTags: [{ id: 'style/sixties', labels: 'sixties' }],
      geoTags: [{ id: 'geo/usa', labels: 'usa' }],
      reviews: [{}],
      soldOutPerformances: [
        {
          date: '2018/01/01',
          at: '18:00',
          key: '2018/01/01-18:00'
        }
      ],
      description: 'Rich Text Description',
      descriptionCredit: 'Description Credit',
      links: [{ type: linkType.WIKIPEDIA, key: linkType.WIKIPEDIA }],
      images: [
        {
          id: '1111',
          key: '1111',
          isMain: true,
          previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg'
        }
      ],
      weSay: 'We Say',
      version: 100
    })
  })
})
