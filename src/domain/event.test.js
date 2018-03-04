import { SummaryEvent, FullEvent } from '_src/domain/event'
import { EventSummaryTalent } from '_src/domain/talent'
import { SummaryVenue } from '_src/domain/venue'
import { SummaryEventSeries } from '_src/domain/event-series'
import * as timeLib from '_src/shared/lib/time'
import * as eventLib from '_src/shared/lib/event'
import entityType from '_src/domain/types/entity-type'

describe('SummaryEvent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.EVENT,
      id: 'event-id',
      status: 'Active',
      name: 'Taming of the Shrew',
      eventType: 'Performance',
      occurrenceType: 'Bounded',
      soldOut: true,
      costType: 'Paid',
      dateFrom: '2016/02/11',
      dateTo: '2016/02/13',
      summary: 'A Shakespearian classic',
      venueId: 'almeida-theatre',
      venueName: 'Almeida Theatre',
      postcode: 'N5 2UA',
      latitude: 53,
      longitude: 2,
      image: '12345678123456781234567812345678',
      imageCopyright: 'foo',
      imageRatio: 1.2
    }
  })

  it('should handle the key', () => {
    const actual = new SummaryEvent(entity)
    expect(actual.key).toEqual('event-id')
  })

  describe('isFreeEvent', () => {
    it('should handle a free event', () => {
      entity.costType = 'Free'
      const actual = new SummaryEvent(entity)
      expect(actual.isFreeEvent()).toEqual(true)
    })

    it('should handle a paid event', () => {
      entity.costType = 'Paid'
      const actual = new SummaryEvent(entity)
      expect(actual.isFreeEvent()).toEqual(false)
    })
  })

  describe('getEntityTypeLabel', () => {
    it('should handle getting the entity type label for a free event', () => {
      entity.costType = 'Free'
      const actual = new SummaryEvent(entity)
      expect(actual.getEntityTypeLabel()).toEqual('Free Event')
    })

    it('should handle getting the entity type label for a paid event', () => {
      entity.costType = 'Paid'
      const actual = new SummaryEvent(entity)
      expect(actual.getEntityTypeLabel()).toEqual('Event')
    })
  })

  describe('hasImage', () => {
    it('should handle having an image', () => {
      entity.image = '12345678123456781234567812345678'
      const actual = new SummaryEvent(entity)
      expect(actual.hasImage()).toEqual(true)
    })

    it('should handle having no image', () => {
      entity.image = null
      const actual = new SummaryEvent(entity)
      expect(actual.hasImage()).toEqual(false)
    })
  })

  it('should handle getUrl', () => {
    const actual = new SummaryEvent(entity)
    expect(actual.getUrl()).toEqual('/event/event-id')
  })

  it('should handle getPostcodeDistrict', () => {
    const actual = new SummaryEvent(entity)
    expect(actual.getPostcodeDistrict()).toEqual('N5')
  })

  describe('isExpiredOn', () => {
    it('should handle an expired event', () => {
      entity.dateTo = '2017/12/12'
      const actual = new SummaryEvent(entity)
      expect(actual.isExpiredOn('2018/01/01')).toEqual(true)
    })

    it('should handle a not expired event', () => {
      entity.dateTo = '2018/12/12'
      const actual = new SummaryEvent(entity)
      expect(actual.isExpiredOn('2018/01/01')).toEqual(false)
    })
  })

  it('should handle createDateRangeLabel', () => {
    timeLib.createDateRangeLabel = jest.fn().mockReturnValue('Date Range Label')

    const actual = new SummaryEvent(entity)

    expect(actual.createDateRangeLabel('2018/01/01')).toEqual(
      'Date Range Label'
    )

    expect(timeLib.createDateRangeLabel).toHaveBeenCalledWith(
      '2018/01/01',
      '2016/02/11',
      '2016/02/13'
    )
  })

  describe('isCurrent', () => {
    it('should handle a future event', () => {
      entity.dateFrom = '2019/01/01'
      entity.dateTo = '2019/02/02'

      const actual = new SummaryEvent(entity)

      expect(actual.isCurrent('2018/01/01')).toEqual(false)
    })

    it('should handle a past event', () => {
      entity.dateFrom = '2017/01/01'
      entity.dateTo = '2017/02/02'

      const actual = new SummaryEvent(entity)

      expect(actual.isCurrent('2018/01/01')).toEqual(false)
    })

    it('should handle a current event', () => {
      entity.dateFrom = '2017/01/01'
      entity.dateTo = '2019/02/02'

      const actual = new SummaryEvent(entity)

      expect(actual.isCurrent('2018/01/01')).toEqual(true)
    })

    it('should handle an event with no dates', () => {
      entity.dateFrom = null
      entity.dateTo = null

      const actual = new SummaryEvent(entity)

      expect(actual.isCurrent('2018/01/01')).toEqual(true)
    })
  })
})

describe('FullEvent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      id: 'event-id',
      status: 'Active',
      name: 'Taming of the Shrew',
      eventType: 'Performance',
      occurrenceType: 'Bounded',
      dateFrom: '2016/02/11',
      dateTo: '2016/02/13',
      soldOut: true,
      costType: 'Paid',
      costFrom: 20,
      costTo: 21,
      bookingType: 'NotRequired',
      bookingOpens: '2017/12/13',
      summary: 'A Shakespearian classic',
      description: 'A contemporary update of this Shakespearian classic',
      descriptionCredit: 'Description credit',
      rating: 3,
      minAge: 14,
      maxAge: 18,
      links: [{ type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }],
      eventSeries: {
        entityType: entityType.EVENT_SERIES,
        eventSeriesType: 'Occasional',
        id: 'event-series-id',
        name: 'Some Event Series',
        occurrence: 'Some occurrence',
        status: 'Active',
        summary: 'A summary',
        description: undefined
      },
      venue: {
        entityType: entityType.VENUE,
        status: 'Active',
        venueType: 'Theatre',
        id: 'venue-id',
        name: 'Almeida Theatre',
        address: 'Islington',
        postcode: 'N5 2UA',
        latitude: 53,
        longitude: 2,
        wheelchairAccessType: 'FullAccess',
        disabledBathroomType: 'Present',
        hearingFacilitiesType: 'HearingLoops',
        hasPermanentCollection: false
      },
      venueGuidance: 'Through the curtains',
      useVenueOpeningTimes: false,
      timesRanges: [
        {
          id: 'all-run',
          label: 'all run',
          dateFrom: '2016/02/11',
          dateTo: '2016/02/13'
        }
      ],
      performances: [{ day: 6, at: '12:00', timesRangeId: 'all-run' }],
      additionalPerformances: [{ date: '2016/08/15', at: '08:00' }],
      duration: '01:00',
      talents: [
        {
          entityType: entityType.TALENT,
          commonRole: 'Foo',
          id: 'talent-id',
          firstNames: 'John',
          lastName: 'Doe',
          status: 'Active',
          talentType: 'Individual',
          roles: ['Director'],
          characters: ['Polonius']
        }
      ],
      audienceTags: [{ id: 'audience/families', label: 'families' }],
      mediumTags: [{ id: 'medium/sculpture', label: 'sculpture' }],
      styleTags: [{ id: 'style/contemporary', label: 'contemporary' }],
      geoTags: [
        { id: 'geo/europe', label: 'europe' },
        { id: 'geo/spain', label: 'spain' }
      ],
      images: [
        {
          id: '12345678123456781234567812345678',
          ratio: 1.2,
          copyright: 'foo'
        }
      ],
      reviews: [{ source: 'The Guardian', rating: 4 }],
      weSay: 'something',
      soldOutPerformances: [{ at: '08:00', date: '2016/08/15' }],
      version: 4,
      schemeVersion: 3,
      createdDate: '2016/01/10',
      updatedDate: '2016/01/11'
    }
  })

  it('should wrap the sub entities', () => {
    const actual = new FullEvent(entity)

    expect(actual.eventSeries).toBeInstanceOf(SummaryEventSeries)
    expect(actual.venue).toBeInstanceOf(SummaryVenue)
    expect(actual.talents[0]).toBeInstanceOf(EventSummaryTalent)
  })

  it('should combine the tags', () => {
    const actual = new FullEvent(entity)

    expect(actual.tags).toEqual([
      { id: 'medium/sculpture', label: 'sculpture', type: 'medium' },
      { id: 'style/contemporary', label: 'contemporary', type: 'style' },
      { id: 'geo/europe', label: 'europe', type: 'geo' },
      { id: 'geo/spain', label: 'spain', type: 'geo' },
      { id: 'audience/families', label: 'families', type: 'audience' }
    ])
  })

  it('should handle the id', () => {
    const actual = new FullEvent(entity)
    expect(actual.id).toEqual('event-id')
  })

  it('should handle the entity type', () => {
    const actual = new FullEvent(entity)
    expect(actual.entityType).toEqual(entityType.EVENT)
  })

  it('should handle the edit url', () => {
    const actual = new FullEvent(entity)
    expect(actual.getEditUrl()).toEqual('/event/edit/event-id')
  })

  describe('createAgeDescription', () => {
    it('should handle an age', () => {
      entity.minAge = 5
      const actual = new FullEvent(entity)
      expect(actual.createAgeDescription()).toEqual('5+')
    })

    it('should handle no age', () => {
      entity.minAge = null
      const actual = new FullEvent(entity)
      expect(actual.createAgeDescription()).toEqual(null)
    })
  })

  describe('getInfoBarLabel', () => {
    it('should handle an event with no medium', () => {
      entity.mediumTags = []

      const actual = new FullEvent(entity)

      expect(actual.getInfoBarLabel()).toEqual('unknown medium')
    })

    it('should handle an event with one medium', () => {
      const actual = new FullEvent(entity)

      expect(actual.getInfoBarLabel()).toEqual('sculpture')
    })

    it('should handle an event with two mediums', () => {
      entity.mediumTags = [
        { id: 'medium/sculpture', label: 'sculpture' },
        { id: 'medium/painting', label: 'painting' }
      ]

      const actual = new FullEvent(entity)

      expect(actual.getInfoBarLabel()).toEqual('sculpture / painting')
    })

    it('should handle an event with three mediums', () => {
      entity.mediumTags = [
        { id: 'medium/sculpture', label: 'sculpture' },
        { id: 'medium/painting', label: 'painting' },
        { id: 'medium/photography', label: 'photography' }
      ]

      const actual = new FullEvent(entity)

      expect(actual.getInfoBarLabel()).toEqual('mixed media')
    })
  })

  it('should handle createEventOccurrenceDescriptionOn', () => {
    eventLib.formatEventOccurrenceForDisplay = jest
      .fn()
      .mockReturnValue('Event Occurrence')

    const actual = new FullEvent(entity)

    expect(actual.createEventOccurrenceDescriptionOn('2018/01/01')).toEqual(
      'Event Occurrence'
    )

    expect(eventLib.formatEventOccurrenceForDisplay).toHaveBeenCalledWith(
      'Bounded',
      'Performance',
      '2016/02/11',
      '2016/02/13',
      [{ date: '2016/08/15', at: '08:00' }],
      '2018/01/01'
    )
  })

  it('should handle createCostDescription', () => {
    eventLib.formatCostForDisplay = jest.fn().mockReturnValue('Cost')

    const actual = new FullEvent(entity)

    expect(actual.createCostDescription()).toEqual('Cost')
    expect(eventLib.formatCostForDisplay).toHaveBeenCalledWith('Paid', 20, 21)
  })

  it('should handle createBookingDescriptionOn', () => {
    eventLib.formatBookingInfoForDisplay = jest.fn().mockReturnValue('Cost')

    const actual = new FullEvent(entity)

    expect(actual.createBookingDescriptionOn('2018/01/01')).toEqual('Cost')

    expect(eventLib.formatBookingInfoForDisplay).toHaveBeenCalledWith(
      'NotRequired',
      '2017/12/13',
      actual,
      '2018/01/01'
    )
  })

  it('should handle createTimesDetailsOn', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times Details')

    const actual = new FullEvent(entity)

    expect(actual.createTimesDetailsOn('2018/01/01')).toEqual('Times Details')

    expect(timeLib.getTimesDetails).toHaveBeenCalledWith(
      actual,
      entityType.EVENT,
      '2018/01/01'
    )
  })

  it('should handle getPin', () => {
    const actual = new FullEvent(entity)

    expect(actual.getPin()).toEqual({
      lat: 53,
      lng: 2
    })
  })

  describe('hasEventSeries', () => {
    it('should handle an event with an event series', () => {
      const actual = new FullEvent(entity)
      expect(actual.hasEventSeries()).toEqual(true)
    })

    it('should handle an event with no event series', () => {
      entity.eventSeries = null
      const actual = new FullEvent(entity)
      expect(actual.hasEventSeries()).toEqual(false)
    })
  })

  describe('hasTalents', () => {
    it('should handle an event with talents', () => {
      const actual = new FullEvent(entity)
      expect(actual.hasTalents()).toEqual(true)
    })

    it('should handle an event with no talents', () => {
      entity.talents = []
      const actual = new FullEvent(entity)
      expect(actual.hasTalents()).toEqual(false)
    })
  })

  describe('hasTags', () => {
    it('should handle an event with tags', () => {
      const actual = new FullEvent(entity)
      expect(actual.hasTags()).toEqual(true)
    })

    it('should handle an event with no tags', () => {
      entity.mediumTags = []
      entity.styleTags = []
      entity.geoTags = []
      entity.audienceTags = []

      const actual = new FullEvent(entity)

      expect(actual.hasTags()).toEqual(false)
    })
  })

  describe('isExpiredOn', () => {
    it('should handle an expired event', () => {
      entity.dateTo = '2017/12/12'
      const actual = new FullEvent(entity)
      expect(actual.isExpiredOn('2018/01/01')).toEqual(true)
    })

    it('should handle a not expired event', () => {
      entity.dateTo = '2018/12/12'
      const actual = new FullEvent(entity)
      expect(actual.isExpiredOn('2018/01/01')).toEqual(false)
    })
  })

  describe('getHomepageUrl', () => {
    it('should handle an event with a homepage', () => {
      entity.links = [
        { type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' },
        { type: 'Homepage', url: 'https://homepage.com/foo' }
      ]

      const actual = new FullEvent(entity)
      expect(actual.getHomepageUrl()).toEqual('https://homepage.com/foo')
    })

    it('should handle an event with no homepage', () => {
      entity.links = [
        { type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }
      ]

      const actual = new FullEvent(entity)
      expect(actual.getHomepageUrl()).toEqual(null)
    })
  })
})
