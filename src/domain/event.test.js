import { SummaryEvent, FullEvent } from '_src/domain/event'
import { EventSummaryTalent } from '_src/domain/talent'
import { SummaryVenue } from '_src/domain/venue'
import { SummaryEventSeries } from '_src/domain/event-series'
import * as timeLib from '_src/shared/lib/time'
import * as eventLib from '_src/shared/lib/event'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'
import talentType from '_src/domain/types/talent-type'
import statusType from '_src/domain/types/status-type'
import bookingType from '_src/domain/types/booking-type'
import costType from '_src/domain/types/cost-type'
import eventType from '_src/domain/types/event-type'
import occurrenceType from '_src/domain/types/occurrence-type'
import tagType from '_src/domain/types/tag-type'
import venueType from '_src/domain/types/venue-type'
import eventSeriesType from '_src/domain/types/event-series-type'
import hearingFacilitiesType from '_src/domain/types/hearing-facilities-type'
import disabledBathroomType from '_src/domain/types/disabled-bathroom-type'
import wheelchairAccessType from '_src/domain/types/wheelchair-access-type'

describe('SummaryEvent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.EVENT,
      id: 'event-id',
      status: statusType.ACTIVE,
      name: 'Taming of the Shrew',
      eventType: eventType.PERFORMANCE,
      occurrenceType: occurrenceType.BOUNDED,
      soldOut: true,
      costType: costType.PAID,
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
    const subject = new SummaryEvent(entity)
    expect(subject.key).toEqual('event-id')
  })

  describe('isFreeEvent', () => {
    it('should handle a free event', () => {
      entity.costType = costType.FREE
      const subject = new SummaryEvent(entity)
      expect(subject.isFreeEvent()).toEqual(true)
    })

    it('should handle a paid event', () => {
      entity.costType = costType.PAID
      const subject = new SummaryEvent(entity)
      expect(subject.isFreeEvent()).toEqual(false)
    })
  })

  describe('getEntityTypeLabel', () => {
    it('should handle getting the entity type label for a free event', () => {
      entity.costType = costType.FREE
      const subject = new SummaryEvent(entity)
      expect(subject.getEntityTypeLabel()).toEqual('Free Event')
    })

    it('should handle getting the entity type label for a paid event', () => {
      entity.costType = costType.PAID
      const subject = new SummaryEvent(entity)
      expect(subject.getEntityTypeLabel()).toEqual('Event')
    })
  })

  describe('hasImage', () => {
    it('should handle having an image', () => {
      entity.image = '12345678123456781234567812345678'
      const subject = new SummaryEvent(entity)
      expect(subject.hasImage()).toEqual(true)
    })

    it('should handle having no image', () => {
      entity.image = null
      const subject = new SummaryEvent(entity)
      expect(subject.hasImage()).toEqual(false)
    })
  })

  it('should handle getUrl', () => {
    const subject = new SummaryEvent(entity)
    expect(subject.getUrl()).toEqual('/event/event-id')
  })

  it('should handle getPostcodeDistrict', () => {
    const subject = new SummaryEvent(entity)
    expect(subject.getPostcodeDistrict()).toEqual('N5')
  })

  describe('isExpiredOn', () => {
    it('should handle an expired event', () => {
      entity.dateTo = '2017/12/12'
      const subject = new SummaryEvent(entity)
      expect(subject.isExpiredOn('2018/01/01')).toEqual(true)
    })

    it('should handle a not expired event', () => {
      entity.dateTo = '2018/12/12'
      const subject = new SummaryEvent(entity)
      expect(subject.isExpiredOn('2018/01/01')).toEqual(false)
    })
  })

  it('should handle createDateRangeLabel', () => {
    timeLib.createDateRangeLabel = jest.fn().mockReturnValue('Date Range Label')

    const subject = new SummaryEvent(entity)

    expect(subject.createDateRangeLabel('2018/01/01')).toEqual(
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

      const subject = new SummaryEvent(entity)

      expect(subject.isCurrent('2018/01/01')).toEqual(false)
    })

    it('should handle a past event', () => {
      entity.dateFrom = '2017/01/01'
      entity.dateTo = '2017/02/02'

      const subject = new SummaryEvent(entity)

      expect(subject.isCurrent('2018/01/01')).toEqual(false)
    })

    it('should handle a current event', () => {
      entity.dateFrom = '2017/01/01'
      entity.dateTo = '2019/02/02'

      const subject = new SummaryEvent(entity)

      expect(subject.isCurrent('2018/01/01')).toEqual(true)
    })

    it('should handle an event with no dates', () => {
      entity.dateFrom = null
      entity.dateTo = null

      const subject = new SummaryEvent(entity)

      expect(subject.isCurrent('2018/01/01')).toEqual(true)
    })
  })
})

describe('FullEvent', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      id: 'event-id',
      status: statusType.ACTIVE,
      name: 'Taming of the Shrew',
      eventType: eventType.PERFORMANCE,
      occurrenceType: occurrenceType.BOUNDED,
      dateFrom: '2016/02/11',
      dateTo: '2016/02/13',
      soldOut: true,
      costType: costType.PAID,
      costFrom: 20,
      costTo: 21,
      bookingType: bookingType.NOT_REQUIRED,
      bookingOpens: '2017/12/13',
      summary: 'A Shakespearian classic',
      description: 'A contemporary update of this Shakespearian classic',
      descriptionCredit: 'Description credit',
      rating: 3,
      minAge: 14,
      maxAge: 18,
      links: [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ],
      eventSeries: {
        entityType: entityType.EVENT_SERIES,
        eventSeriesType: eventSeriesType.OCCASIONAL,
        id: 'event-series-id',
        name: 'Some Event Series',
        occurrence: 'Some occurrence',
        status: statusType.ACTIVE,
        summary: 'A summary',
        description: undefined
      },
      venue: {
        entityType: entityType.VENUE,
        status: statusType.ACTIVE,
        venueType: venueType.THEATRE,
        id: 'venue-id',
        name: 'Almeida Theatre',
        address: 'Islington',
        postcode: 'N5 2UA',
        latitude: 53,
        longitude: 2,
        wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
        disabledBathroomType: disabledBathroomType.PRESENT,
        hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS,
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
          status: statusType.ACTIVE,
          talentType: talentType.INDIVIDUAL,
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
    const subject = new FullEvent(entity)

    expect(subject.eventSeries).toBeInstanceOf(SummaryEventSeries)
    expect(subject.venue).toBeInstanceOf(SummaryVenue)
    expect(subject.talents[0]).toBeInstanceOf(EventSummaryTalent)
  })

  it('should combine the tags', () => {
    const subject = new FullEvent(entity)

    expect(subject.tags).toEqual([
      { id: 'medium/sculpture', label: 'sculpture', type: tagType.MEDIUM },
      { id: 'style/contemporary', label: 'contemporary', type: tagType.STYLE },
      { id: 'geo/europe', label: 'europe', type: tagType.GEO },
      { id: 'geo/spain', label: 'spain', type: tagType.GEO },
      { id: 'audience/families', label: 'families', type: tagType.AUDIENCE }
    ])
  })

  it('should handle the id', () => {
    const subject = new FullEvent(entity)
    expect(subject.id).toEqual('event-id')
  })

  it('should handle the entity type', () => {
    const subject = new FullEvent(entity)
    expect(subject.entityType).toEqual(entityType.EVENT)
  })

  it('should handle the edit url', () => {
    const subject = new FullEvent(entity)
    expect(subject.getEditUrl()).toEqual('/event/edit/event-id')
  })

  describe('createAgeDescription', () => {
    it('should handle an age', () => {
      entity.minAge = 5
      const subject = new FullEvent(entity)
      expect(subject.createAgeDescription()).toEqual('5+')
    })

    it('should handle no age', () => {
      entity.minAge = null
      const subject = new FullEvent(entity)
      expect(subject.createAgeDescription()).toEqual(null)
    })
  })

  describe('getInfoBarLabel', () => {
    it('should handle an event with no medium', () => {
      entity.mediumTags = []

      const subject = new FullEvent(entity)

      expect(subject.getInfoBarLabel()).toEqual('unknown medium')
    })

    it('should handle an event with one medium', () => {
      const subject = new FullEvent(entity)

      expect(subject.getInfoBarLabel()).toEqual('sculpture')
    })

    it('should handle an event with two mediums', () => {
      entity.mediumTags = [
        { id: 'medium/sculpture', label: 'sculpture' },
        { id: 'medium/painting', label: 'painting' }
      ]

      const subject = new FullEvent(entity)

      expect(subject.getInfoBarLabel()).toEqual('sculpture / painting')
    })

    it('should handle an event with three mediums', () => {
      entity.mediumTags = [
        { id: 'medium/sculpture', label: 'sculpture' },
        { id: 'medium/painting', label: 'painting' },
        { id: 'medium/photography', label: 'photography' }
      ]

      const subject = new FullEvent(entity)

      expect(subject.getInfoBarLabel()).toEqual('mixed media')
    })
  })

  it('should handle createEventOccurrenceDescriptionOn', () => {
    eventLib.formatEventOccurrenceForDisplay = jest
      .fn()
      .mockReturnValue('Event Occurrence')

    const subject = new FullEvent(entity)

    expect(subject.createEventOccurrenceDescriptionOn('2018/01/01')).toEqual(
      'Event Occurrence'
    )

    expect(eventLib.formatEventOccurrenceForDisplay).toHaveBeenCalledWith(
      occurrenceType.BOUNDED,
      eventType.PERFORMANCE,
      '2016/02/11',
      '2016/02/13',
      [{ date: '2016/08/15', at: '08:00' }],
      '2018/01/01'
    )
  })

  it('should handle createCostDescription', () => {
    eventLib.formatCostForDisplay = jest.fn().mockReturnValue('Cost')

    const subject = new FullEvent(entity)

    expect(subject.createCostDescription()).toEqual('Cost')
    expect(eventLib.formatCostForDisplay).toHaveBeenCalledWith(
      costType.PAID,
      20,
      21
    )
  })

  it('should handle createBookingDescriptionOn', () => {
    eventLib.formatBookingInfoForDisplay = jest.fn().mockReturnValue('Cost')

    const subject = new FullEvent(entity)

    expect(subject.createBookingDescriptionOn('2018/01/01')).toEqual('Cost')

    expect(eventLib.formatBookingInfoForDisplay).toHaveBeenCalledWith(
      bookingType.NOT_REQUIRED,
      '2017/12/13',
      subject,
      '2018/01/01'
    )
  })

  it('should handle createTimesDetailsOn', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times Details')

    const subject = new FullEvent(entity)

    expect(subject.createTimesDetailsOn('2018/01/01')).toEqual('Times Details')

    expect(timeLib.getTimesDetails).toHaveBeenCalledWith(
      subject,
      entityType.EVENT,
      '2018/01/01'
    )
  })

  it('should handle getPin', () => {
    const subject = new FullEvent(entity)

    expect(subject.getPin()).toEqual({
      lat: 53,
      lng: 2
    })
  })

  describe('hasEventSeries', () => {
    it('should handle an event with an event series', () => {
      const subject = new FullEvent(entity)
      expect(subject.hasEventSeries()).toEqual(true)
    })

    it('should handle an event with no event series', () => {
      entity.eventSeries = null
      const subject = new FullEvent(entity)
      expect(subject.hasEventSeries()).toEqual(false)
    })
  })

  describe('hasTalents', () => {
    it('should handle an event with talents', () => {
      const subject = new FullEvent(entity)
      expect(subject.hasTalents()).toEqual(true)
    })

    it('should handle an event with no talents', () => {
      entity.talents = []
      const subject = new FullEvent(entity)
      expect(subject.hasTalents()).toEqual(false)
    })
  })

  describe('hasTags', () => {
    it('should handle an event with tags', () => {
      const subject = new FullEvent(entity)
      expect(subject.hasTags()).toEqual(true)
    })

    it('should handle an event with no tags', () => {
      entity.mediumTags = []
      entity.styleTags = []
      entity.geoTags = []
      entity.audienceTags = []

      const subject = new FullEvent(entity)

      expect(subject.hasTags()).toEqual(false)
    })
  })

  describe('isExpiredOn', () => {
    it('should handle an expired event', () => {
      entity.dateTo = '2017/12/12'
      const subject = new FullEvent(entity)
      expect(subject.isExpiredOn('2018/01/01')).toEqual(true)
    })

    it('should handle a not expired event', () => {
      entity.dateTo = '2018/12/12'
      const subject = new FullEvent(entity)
      expect(subject.isExpiredOn('2018/01/01')).toEqual(false)
    })
  })

  describe('getHomepageUrl', () => {
    it('should handle an event with a homepage', () => {
      entity.links = [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' },
        { type: linkType.HOMEPAGE, url: 'https://homepage.com/foo' }
      ]

      const subject = new FullEvent(entity)
      expect(subject.getHomepageUrl()).toEqual('https://homepage.com/foo')
    })

    it('should handle an event with no homepage', () => {
      entity.links = [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ]

      const subject = new FullEvent(entity)
      expect(subject.getHomepageUrl()).toEqual(null)
    })
  })
})
