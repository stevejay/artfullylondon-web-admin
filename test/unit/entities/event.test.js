import { SummaryEvent, FullEvent } from '_src/entities/event'
import * as eventConstants from '_src/constants/event'
import * as entityConstants from '_src/constants/entity'
import * as linkConstants from '_src/constants/link'
import * as eventLib from '_src/lib/event'
import * as timeLib from '_src/lib/time'
import * as entityLib from '_src/lib/entity'

describe('SummaryEvent', () => {
  it('should have correct entityType', () => {
    const subject = new SummaryEvent({})
    expect(subject.entityType).toBe('event')
  })

  it('should have correct entityTypeLabel', () => {
    const subject = new SummaryEvent({})
    expect(subject.entityTypeLabel).toBe('Event')
  })

  it('should have correct entityTypeLabel for a free event', () => {
    const subject = new SummaryEvent({ costType: 'Free' })
    expect(subject.entityTypeLabel).toBe('Free Event')
  })

  it('should have correct id', () => {
    const subject = new SummaryEvent({ id: 'some-id' })
    expect(subject.id).toBe('some-id')
  })

  it('should have correct key', () => {
    const subject = new SummaryEvent({ id: 'some-id' })
    expect(subject.key).toBe('some-id')
  })

  it('should have correct status', () => {
    const subject = new SummaryEvent({ status: 'Active' })
    expect(subject.status).toBe('Active')
  })

  it('should have correct name', () => {
    const subject = new SummaryEvent({ name: 'Almeida' })
    expect(subject.name).toBe('Almeida')
  })

  it('should have correct isFreeEvent for a free event', () => {
    const subject = new SummaryEvent({ costType: 'Free' })
    expect(subject.isFreeEvent).toBe(true)
  })

  it('should have correct isFreeEvent for a paid event', () => {
    const subject = new SummaryEvent({ costType: 'Paid' })
    expect(subject.isFreeEvent).toBe(false)
  })

  it('should have correct url', () => {
    const subject = new SummaryEvent({ id: 'almeida-theatre/2017/foo' })
    expect(subject.url).toBe('/event/almeida-theatre/2017/foo')
  })

  it('should have correct editUrl', () => {
    const subject = new SummaryEvent({ id: 'almeida-theatre/2017/foo' })
    expect(subject.editUrl).toBe('/event/edit/almeida-theatre/2017/foo')
  })

  it('should have correct summary', () => {
    const subject = new SummaryEvent({ summary: 'Some summary' })
    expect(subject.summary).toBe('Some summary')
  })

  it('should have correct venueId', () => {
    const subject = new SummaryEvent({ venueId: 'almeida' })
    expect(subject.venueId).toBe('almeida')
  })

  it('should have correct venueName', () => {
    const subject = new SummaryEvent({ venueName: 'Almeida' })
    expect(subject.venueName).toBe('Almeida')
  })

  it('should have correct postcode', () => {
    const subject = new SummaryEvent({ postcode: 'N5 2WW' })
    expect(subject.postcode).toBe('N5 2WW')
  })

  it('should have correct latitude', () => {
    const subject = new SummaryEvent({ latitude: 2 })
    expect(subject.latitude).toBe(2)
  })

  it('should have correct longitude', () => {
    const subject = new SummaryEvent({ longitude: 3 })
    expect(subject.longitude).toBe(3)
  })

  it('should have correct pin', () => {
    const subject = new SummaryEvent({ latitude: 2, longitude: 3 })
    expect(subject.pin).toEqual({ lat: 2, lng: 3 })
  })

  it('should have correct hasDates when has dates', () => {
    const subject = new SummaryEvent({ dates: [{}, {}] })
    expect(subject.hasDates).toEqual(true)
  })

  it('should have correct hasDates when has no dates', () => {
    const subject = new SummaryEvent({ dates: [] })
    expect(subject.hasDates).toEqual(false)
  })

  it('should have correct image', () => {
    const subject = new SummaryEvent({ image: '123456' })
    expect(subject.image).toBe('123456')
  })

  it('should have correct imageCopyright', () => {
    const subject = new SummaryEvent({ imageCopyright: 'The copyright' })
    expect(subject.imageCopyright).toBe('The copyright')
  })

  it('should have correct imageRatio', () => {
    const subject = new SummaryEvent({ imageRatio: 2 })
    expect(subject.imageRatio).toBe(2)
  })

  it('should have correct hasImage when has image', () => {
    const subject = new SummaryEvent({ image: '123456' })
    expect(subject.hasImage).toBe(true)
  })

  it('should have correct hasImage when has no image', () => {
    const subject = new SummaryEvent({ image: null })
    expect(subject.hasImage).toBe(false)
  })

  it('should have correct cardImageLoaded', () => {
    const subject = new SummaryEvent({ cardImageLoaded: true })
    expect(subject.cardImageLoaded).toBe(true)
  })

  it('should have correct isFullEntity', () => {
    const subject = new SummaryEvent({})
    expect(subject.isFullEntity).toBe(false)
  })

  it('should have correct isBeingWatched when is being watched', () => {
    const watches = { 'almeida-theatre': true }
    const subject = new SummaryEvent({ id: 'almeida-theatre' })
    expect(subject.isBeingWatched(watches)).toBe(true)
  })

  it('should have correct isBeingWatched when is not being watched', () => {
    const watches = {}
    const subject = new SummaryEvent({ id: 'almeida-theatre' })
    expect(subject.isBeingWatched(watches)).toBe(false)
  })

  it('should have correct createWatchLabel', () => {
    const subject = new SummaryEvent({ name: 'Almeida' })
    expect(subject.createWatchLabel()).toBe('Almeida')
  })

  it('should have correct createWatchChangeInstruction when is being watched', () => {
    const subject = new SummaryEvent({})
    expect(subject.createWatchChangeInstruction(true)).toBe(
      'Unbookmark this event'
    )
  })

  it('should have correct createWatchChangeInstruction when is not being watched', () => {
    const subject = new SummaryEvent({})
    expect(subject.createWatchChangeInstruction(false)).toBe(
      'Bookmark this event'
    )
  })

  it('should have correct isExpiredOn when event is expired', () => {
    const subject = new SummaryEvent({ dateTo: '2017/01/01' })
    expect(subject.isExpiredOn('2017/01/20')).toBe(true)
  })

  it('should have correct isExpiredOn when event is not expired', () => {
    const subject = new SummaryEvent({ dateTo: '2017/01/30' })
    expect(subject.isExpiredOn('2017/01/20')).toBe(false)
  })

  it('should have correct isCurrent when event has no dates', () => {
    const subject = new SummaryEvent({})
    expect(subject.isCurrent('2017/01/20')).toBe(true)
  })

  it('should have correct isCurrent when event dateFrom is later than test date', () => {
    const subject = new SummaryEvent({
      dateFrom: '2017/01/20',
      dateTo: '2017/01/25'
    })

    expect(subject.isCurrent('2017/01/10')).toBe(false)
  })

  it('should have correct isCurrent when event dateTo is less than test date', () => {
    const subject = new SummaryEvent({
      dateFrom: '2017/01/20',
      dateTo: '2017/01/25'
    })

    expect(subject.isCurrent('2017/01/30')).toBe(false)
  })

  it('should have correct isCurrent when event dates contain test date', () => {
    const subject = new SummaryEvent({
      dateFrom: '2017/01/20',
      dateTo: '2017/01/25'
    })

    expect(subject.isCurrent('2017/01/22')).toBe(true)
  })

  it('should clone correctly', () => {
    const source = new SummaryEvent({ name: 'source' })
    const copy = source.shallowClone()

    copy.entity.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })

  it('should create the date range label', () => {
    const subject = new SummaryEvent({
      dateFrom: '2017/01/20',
      dateTo: '2017/01/25'
    })

    expect(subject.createDateRangeLabel('2017/01/22')).toBe('Ends in 3 days')
  })
})

describe('FullEvent', () => {
  it('should have correct images', () => {
    const subject = new FullEvent({ images: [{ id: 'some-id' }], venue: {} })
    expect(subject.images).toEqual([{ id: 'some-id' }])
  })

  it('should have correct isFullEntity', () => {
    const subject = new FullEvent({ venue: {} })
    expect(subject.isFullEntity).toBe(true)
  })

  it('should have correct formatted description when only summary is available', () => {
    const subject = new FullEvent({ summary: 'Some summary', venue: {} })
    expect(subject.createFormattedDescription()).toBe('Some summary')
  })

  it('should have correct formatted description when a full description is available', () => {
    entityLib.processDescription = jest.fn().mockReturnValue('The Result')

    const subject = new FullEvent({
      description: 'Some description',
      descriptionCredit: 'The Credit',
      venue: {}
    })

    expect(subject.createFormattedDescription()).toBe('The Result')

    expect(entityLib.processDescription).toBeCalledWith(
      'Some description',
      'The Credit'
    )
  })

  it('should have correct createAgeDescription when has age restriction', () => {
    const subject = new FullEvent({ minAge: 12, venue: {} })
    expect(subject.createAgeDescription()).toBe('12+')
  })

  it('should have correct createAgeDescription when has no age restriction', () => {
    const subject = new FullEvent({ venue: {} })
    expect(subject.createAgeDescription()).toBe(null)
  })

  it('should have correct createVenueGuidanceDescription', () => {
    const subject = new FullEvent({
      venueGuidance: 'Some guidance',
      venue: {}
    })

    expect(subject.createVenueGuidanceDescription()).toBe('Some guidance')
  })

  it('should have correct hasVenueGuidance when has no venue guidance', () => {
    const subject = new FullEvent({ venue: {} })
    expect(subject.hasVenueGuidance).toBe(false)
  })

  it('should have correct hasVenueGuidance when has venue guidance', () => {
    const subject = new FullEvent({
      venueGuidance: 'Some guidance',
      venue: {}
    })
    expect(subject.hasVenueGuidance).toBe(true)
  })

  it('should have correct hasEventSeries when has no event series', () => {
    const subject = new FullEvent({ venue: {} })
    expect(subject.hasEventSeries).toBe(false)
  })

  it('should have correct hasEventSeries when has event series', () => {
    const subject = new FullEvent({ eventSeries: {}, venue: {} })
    expect(subject.hasEventSeries).toBe(true)
  })

  it('should have correct hasTalents when has no talents', () => {
    const subject = new FullEvent({ talents: [], venue: {} })
    expect(subject.hasTalents).toBe(false)
  })

  it('should have correct hasTalents when has talents', () => {
    const subject = new FullEvent({ talents: [{}], venue: {} })
    expect(subject.hasTalents).toBe(true)
  })

  it('should have correct hasTags when has no tags', () => {
    const subject = new FullEvent({ venue: {} })
    expect(subject.hasTags).toBe(false)
  })

  it('should have correct hasTags when has tags', () => {
    const subject = new FullEvent({
      mediumTags: [{ id: '1', label: 'one' }],
      venue: {}
    })

    expect(subject.hasTags).toBe(true)
  })

  it('should have correct description', () => {
    const subject = new FullEvent({
      description: 'Some description',
      venue: {}
    })

    expect(subject.description).toBe('Some description')
  })

  it('should have correct descriptionCredit', () => {
    const subject = new FullEvent({
      descriptionCredit: 'Some description credit',
      venue: {}
    })

    expect(subject.descriptionCredit).toBe('Some description credit')
  })

  it('should have correct weSay', () => {
    const subject = new FullEvent({ weSay: 'We say', venue: {} })
    expect(subject.weSay).toBe('We say')
  })

  it('should have correct createEventMediumDescription when has more than two mediums', () => {
    const subject = new FullEvent({
      mediumTags: [
        { id: 'medium/painting', label: 'painting' },
        { id: 'medium/drawing', label: 'drawing' },
        { id: 'medium/sculpture', label: 'sculpture' }
      ],
      venue: {}
    })

    expect(subject.createEventMediumDescription()).toBe('mixed media')
  })

  it('should have correct createEventMediumDescription when has two mediums', () => {
    const subject = new FullEvent({
      mediumTags: [
        { id: 'medium/painting', label: 'painting' },
        { id: 'medium/drawing', label: 'drawing' }
      ],
      venue: {}
    })

    expect(subject.createEventMediumDescription()).toBe('painting / drawing')
  })

  it('should have correct createEventMediumDescription when has one medium', () => {
    const subject = new FullEvent({
      mediumTags: [{ id: 'medium/painting', label: 'painting' }],
      venue: {}
    })

    expect(subject.createEventMediumDescription()).toBe('painting')
  })

  it('should have correct createEventMediumDescription when has no mediums', () => {
    const subject = new FullEvent({
      mediumTags: [],
      venue: {}
    })

    expect(subject.createEventMediumDescription()).toBe('unknown medium')
  })

  it('should create an info bar label', () => {
    const subject = new FullEvent({
      mediumTags: [
        { id: 'medium/painting', label: 'painting' },
        { id: 'medium/drawing', label: 'drawing' },
        { id: 'medium/sculpture', label: 'sculpture' }
      ],
      venue: {}
    })

    expect(subject.createInfoBarLabel()).toBe('mixed media')
  })

  it('should create a full description', () => {
    eventLib.formatEventOccurrenceForDisplay = jest
      .fn()
      .mockReturnValue('Full description')

    const subject = new FullEvent({
      occurrenceType: eventConstants.OCCURRENCE_TYPE_BOUNDED,
      eventType: eventConstants.EVENT_TYPE_PERFORMANCE,
      dateFrom: '2017/01/01',
      dateTo: '2017/02/01',
      additionalPerformances: [],
      venue: {}
    })

    expect(subject.createEventOccurrenceDescriptionOn('2017/01/22')).toBe(
      'Full description'
    )

    expect(eventLib.formatEventOccurrenceForDisplay).toBeCalledWith(
      eventConstants.OCCURRENCE_TYPE_BOUNDED,
      eventConstants.EVENT_TYPE_PERFORMANCE,
      '2017/01/01',
      '2017/02/01',
      [],
      '2017/01/22'
    )
  })

  it('should create a cost description', () => {
    eventLib.formatCostForDisplay = jest
      .fn()
      .mockReturnValue('Cost description')

    const subject = new FullEvent({
      costType: eventConstants.COST_TYPE_PAID,
      costFrom: 1,
      costTo: 2,
      venue: {}
    })

    expect(subject.createCostDescription()).toBe('Cost description')

    expect(eventLib.formatCostForDisplay).toBeCalledWith(
      eventConstants.COST_TYPE_PAID,
      1,
      2
    )
  })

  it('should create a booking description', () => {
    eventLib.formatBookingInfoForDisplay = jest
      .fn()
      .mockReturnValue('Booking description')

    const subject = new FullEvent({
      bookingType: eventConstants.BOOKING_TYPE_REQUIRED,
      bookingOpens: '2017/01/20',
      links: [],
      venue: {}
    })

    expect(subject.createBookingDescriptionOn('2017/01/21')).toBe(
      'Booking description'
    )

    expect(eventLib.formatBookingInfoForDisplay).toBeCalledWith(
      eventConstants.BOOKING_TYPE_REQUIRED,
      '2017/01/20',
      { links: [] },
      '2017/01/21'
    )
  })

  it('should create a times description', () => {
    timeLib.formatTimesStringForGivenDate = jest
      .fn()
      .mockReturnValue('Times description')

    const subject = new FullEvent({ venue: {} })

    expect(
      subject.createTimesDescriptionForDate('2017/01/01', '18:00', {})
    ).toBe('Times description')

    expect(timeLib.formatTimesStringForGivenDate).toBeCalledWith(
      { venue: {} },
      '2017/01/01',
      '18:00',
      {}
    )
  })

  it('should create times details', () => {
    timeLib.getTimesDetails = jest.fn().mockReturnValue('Times details')

    const subject = new FullEvent({ venue: {} })

    expect(subject.createTimesDetailsOn('2017/01/20')).toBe('Times details')

    expect(timeLib.getTimesDetails).toBeCalledWith(
      { venue: {} },
      entityConstants.ENTITY_TYPE_EVENT,
      '2017/01/20'
    )
  })

  it('should get the homepage URL', () => {
    const subject = new FullEvent({
      links: [{ type: linkConstants.LINK_TYPE_HOMEPAGE, url: '/some/url' }],
      venue: {}
    })

    expect(subject.getHomepageUrl()).toEqual('/some/url')
  })

  it('should clone correctly', () => {
    const source = new FullEvent({ name: 'source', venue: {} })
    const copy = source.shallowClone()

    copy.entity.name = 'copy'

    expect(source.name).toBe('source')
    expect(copy.name).toBe('copy')
  })
})
