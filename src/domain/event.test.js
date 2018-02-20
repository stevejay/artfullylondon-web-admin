import { SummaryEvent, FullEvent } from '_src/domain/event'

describe('SummaryEvent', () => {
  it('should construct a summary event', () => {
    const entity = {
      entityType: 'event',
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

    const actual = new SummaryEvent(entity)

    expect(actual.entityType).toEqual('event')
    expect(actual.id).toEqual('event-id')
    expect(actual.status).toEqual('Active')
    expect(actual.name).toEqual('Taming of the Shrew')
    expect(actual.eventType).toEqual('Performance')
    expect(actual.occurrenceType).toEqual('Bounded')
    expect(actual.soldOut).toEqual(true)
    expect(actual.costType).toEqual('Paid')
    expect(actual.dateFrom).toEqual('2016/02/11')
    expect(actual.dateTo).toEqual('2016/02/13')
    expect(actual.summary).toEqual('A Shakespearian classic')
    expect(actual.venueId).toEqual('almeida-theatre')
    expect(actual.venueName).toEqual('Almeida Theatre')
    expect(actual.postcode).toEqual('N5 2UA')
    expect(actual.latitude).toEqual(53)
    expect(actual.longitude).toEqual(2)
    expect(actual.image).toEqual('12345678123456781234567812345678')
    expect(actual.imageCopyright).toEqual('foo')
    expect(actual.imageRatio).toEqual(1.2)
    expect(actual.key).toEqual('event-id')
    expect(actual.isFreeEvent()).toEqual(false)
    expect(actual.getEntityTypeLabel()).toEqual('Event')
    expect(actual.hasImage()).toEqual(true)
    expect(actual.getUrl()).toEqual('/event/event-id')
    expect(actual.getPostcodeDistrict()).toEqual('N5')
    expect(actual.cardImageLoaded).toEqual(false)
    expect(actual.isExpiredOn('2016/02/13')).toEqual(false)
    expect(actual.isExpiredOn('2016/02/14')).toEqual(true)
    expect(actual.isCurrent('2016/02/14')).toEqual(false)
    expect(actual.isCurrent('2016/02/13')).toEqual(true)
    expect(actual.isCurrent('2016/02/10')).toEqual(false)
  })
})

describe('FullEvent', () => {
  it('should construct a full event', () => {
    const entity = {
      id: 'event-id',
      status: 'Active',
      name: 'Taming of the Shrew',
      eventType: 'Performance',
      occurrenceType: 'Bounded',
      dateFrom: '2016/02/11',
      dateTo: '2016/02/13',
      soldOut: true,
      costType: 'Paid',
      bookingType: 'NotRequired',
      summary: 'A Shakespearian classic',
      description: 'A contemporary update of this Shakespearian classic',
      descriptionCredit: 'Description credit',
      rating: 3,
      minAge: 14,
      maxAge: 18,
      links: [{ type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }],
      eventSeries: {
        entityType: 'event-series',
        eventSeriesType: 'Occasional',
        id: 'event-series-id',
        name: 'Some Event Series',
        occurrence: 'Some occurrence',
        status: 'Active',
        summary: 'A summary',
        description: undefined
      },
      venue: {
        entityType: 'venue',
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
          entityType: 'talent',
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

    const actual = new FullEvent(entity)

    expect(actual.id).toEqual('event-id')
  })
})
