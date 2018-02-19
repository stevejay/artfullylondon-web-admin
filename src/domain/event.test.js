import { SummaryEvent, FullEvent } from '_src/domain/event'
import eventType from '_src/domain/types/event-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import occurrenceType from '_src/domain/types/occurrence-type'
import entityType from '_src/domain/types/entity-type'
import linkType from '_src/domain/types/link-type'
import * as eventLib from '_src/lib/event'
import * as timeLib from '_src/lib/time'
import * as entityLib from '_src/lib/entity'

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

// describe('SummaryEvent', () => {
//   it('should have correct entityType', () => {
//     const subject = new SummaryEvent({})
//     expect(subject.entityType).toBe('event')
//   })

//   it('should have correct getEntityTypeLabel', () => {
//     const subject = new SummaryEvent({})
//     expect(subject.getEntityTypeLabel()).toBe('Event')
//   })

//   it('should have correct getEntityTypeLabel for a free event', () => {
//     const subject = new SummaryEvent({ costType: 'Free' })
//     expect(subject.getEntityTypeLabel()).toBe('Free Event')
//   })

//   it('should have correct id', () => {
//     const subject = new SummaryEvent({ id: 'some-id' })
//     expect(subject.id).toBe('some-id')
//   })

//   it('should have correct key', () => {
//     const subject = new SummaryEvent({ id: 'some-id' })
//     expect(subject.key).toBe('some-id')
//   })

//   it('should have correct status', () => {
//     const subject = new SummaryEvent({ status: 'Active' })
//     expect(subject.status).toBe('Active')
//   })

//   it('should have correct name', () => {
//     const subject = new SummaryEvent({ name: 'Almeida' })
//     expect(subject.name).toBe('Almeida')
//   })

//   it('should have correct isFreeEvent for a free event', () => {
//     const subject = new SummaryEvent({ costType: 'Free' })
//     expect(subject.isFreeEvent).toBe(true)
//   })

//   it('should have correct isFreeEvent for a paid event', () => {
//     const subject = new SummaryEvent({ costType: 'Paid' })
//     expect(subject.isFreeEvent).toBe(false)
//   })

//   it('should have correct url', () => {
//     const subject = new SummaryEvent({ id: 'almeida-theatre/2017/foo' })
//     expect(subject.url).toBe('/event/almeida-theatre/2017/foo')
//   })

//   it('should have correct getEditUrl', () => {
//     const subject = new SummaryEvent({ id: 'almeida-theatre/2017/foo' })
//     expect(subject.getEditUrl()).toBe('/event/edit/almeida-theatre/2017/foo')
//   })

//   it('should have correct summary', () => {
//     const subject = new SummaryEvent({ summary: 'Some summary' })
//     expect(subject.summary).toBe('Some summary')
//   })

//   it('should have correct venueId', () => {
//     const subject = new SummaryEvent({ venueId: 'almeida' })
//     expect(subject.venueId).toBe('almeida')
//   })

//   it('should have correct venueName', () => {
//     const subject = new SummaryEvent({ venueName: 'Almeida' })
//     expect(subject.venueName).toBe('Almeida')
//   })

//   it('should have correct postcode', () => {
//     const subject = new SummaryEvent({ postcode: 'N5 2WW' })
//     expect(subject.postcode).toBe('N5 2WW')
//   })

//   it('should have correct hasDates when has dates', () => {
//     const subject = new SummaryEvent({ dates: [{}, {}] })
//     expect(subject.hasDates).toEqual(true)
//   })

//   it('should have correct hasDates when has no dates', () => {
//     const subject = new SummaryEvent({ dates: [] })
//     expect(subject.hasDates).toEqual(false)
//   })

//   it('should have correct image', () => {
//     const subject = new SummaryEvent({ image: '123456' })
//     expect(subject.image).toBe('123456')
//   })

//   it('should have correct imageCopyright', () => {
//     const subject = new SummaryEvent({ imageCopyright: 'The copyright' })
//     expect(subject.imageCopyright).toBe('The copyright')
//   })

//   it('should have correct imageRatio', () => {
//     const subject = new SummaryEvent({ imageRatio: 2 })
//     expect(subject.imageRatio).toBe(2)
//   })

//   it('should have correct hasImage when has image', () => {
//     const subject = new SummaryEvent({ image: '123456' })
//     expect(subject.hasImage).toBe(true)
//   })

//   it('should have correct hasImage when has no image', () => {
//     const subject = new SummaryEvent({ image: null })
//     expect(subject.hasImage).toBe(false)
//   })

//   it('should have correct cardImageLoaded', () => {
//     const subject = new SummaryEvent({ cardImageLoaded: true })
//     expect(subject.cardImageLoaded).toBe(true)
//   })

//   it('should have correct isExpiredOn when event is expired', () => {
//     const subject = new SummaryEvent({ dateTo: '2017/01/01' })
//     expect(subject.isExpiredOn('2017/01/20')).toBe(true)
//   })

//   it('should have correct isExpiredOn when event is not expired', () => {
//     const subject = new SummaryEvent({ dateTo: '2017/01/30' })
//     expect(subject.isExpiredOn('2017/01/20')).toBe(false)
//   })

//   it('should have correct isCurrent when event has no dates', () => {
//     const subject = new SummaryEvent({})
//     expect(subject.isCurrent('2017/01/20')).toBe(true)
//   })

//   it('should have correct isCurrent when event dateFrom is later than test date', () => {
//     const subject = new SummaryEvent({
//       dateFrom: '2017/01/20',
//       dateTo: '2017/01/25'
//     })

//     expect(subject.isCurrent('2017/01/10')).toBe(false)
//   })

//   it('should have correct isCurrent when event dateTo is less than test date', () => {
//     const subject = new SummaryEvent({
//       dateFrom: '2017/01/20',
//       dateTo: '2017/01/25'
//     })

//     expect(subject.isCurrent('2017/01/30')).toBe(false)
//   })

//   it('should have correct isCurrent when event dates contain test date', () => {
//     const subject = new SummaryEvent({
//       dateFrom: '2017/01/20',
//       dateTo: '2017/01/25'
//     })

//     expect(subject.isCurrent('2017/01/22')).toBe(true)
//   })

//   it('should clone correctly', () => {
//     const source = new SummaryEvent({ name: 'source' })
//     const copy = source.createShallowClone()

//     copy.entity.name = 'copy'

//     expect(source.name).toBe('source')
//     expect(copy.name).toBe('copy')
//   })

//   it('should create the date range label', () => {
//     const subject = new SummaryEvent({
//       dateFrom: '2017/01/20',
//       dateTo: '2017/01/25'
//     })

//     expect(subject.createDateRangeLabel('2017/01/22')).toBe('Ends in 3 days')
//   })
// })

// describe('FullEvent', () => {
//   it('should have correct images', () => {
//     const subject = new FullEvent({ images: [{ id: 'some-id' }], venue: {} })
//     expect(subject.images).toEqual([{ id: 'some-id' }])
//   })

//   it('should have correct formatted description when only summary is available', () => {
//     const subject = new FullEvent({ summary: 'Some summary', venue: {} })
//     expect(subject.createFormattedDescription()).toBe('Some summary')
//   })

//   it('should have correct formatted description when a full description is available', () => {
//     entityLib.processDescription = jest.fn().mockReturnValue('The Result')

//     const subject = new FullEvent({
//       description: 'Some description',
//       descriptionCredit: 'The Credit',
//       venue: {}
//     })

//     expect(subject.createFormattedDescription()).toBe('The Result')

//     expect(entityLib.processDescription).toBeCalledWith(
//       'Some description',
//       'The Credit'
//     )
//   })

//   it('should have correct createAgeDescription when has age restriction', () => {
//     const subject = new FullEvent({ minAge: 12, venue: {} })
//     expect(subject.createAgeDescription()).toBe('12+')
//   })

//   it('should have correct createAgeDescription when has no age restriction', () => {
//     const subject = new FullEvent({ venue: {} })
//     expect(subject.createAgeDescription()).toBe(null)
//   })

//   it('should have correct createVenueGuidanceDescription', () => {
//     const subject = new FullEvent({
//       venueGuidance: 'Some guidance',
//       venue: {}
//     })

//     expect(subject.createVenueGuidanceDescription()).toBe('Some guidance')
//   })

//   it('should have correct hasVenueGuidance when has no venue guidance', () => {
//     const subject = new FullEvent({ venue: {} })
//     expect(subject.hasVenueGuidance).toBe(false)
//   })

//   it('should have correct hasVenueGuidance when has venue guidance', () => {
//     const subject = new FullEvent({
//       venueGuidance: 'Some guidance',
//       venue: {}
//     })
//     expect(subject.hasVenueGuidance).toBe(true)
//   })

//   it('should have correct hasEventSeries when has no event series', () => {
//     const subject = new FullEvent({ venue: {} })
//     expect(subject.hasEventSeries).toBe(false)
//   })

//   it('should have correct hasEventSeries when has event series', () => {
//     const subject = new FullEvent({ eventSeries: {}, venue: {} })
//     expect(subject.hasEventSeries).toBe(true)
//   })

//   it('should have correct hasTalents when has no talents', () => {
//     const subject = new FullEvent({ talents: [], venue: {} })
//     expect(subject.hasTalents).toBe(false)
//   })

//   it('should have correct hasTalents when has talents', () => {
//     const subject = new FullEvent({ talents: [{}], venue: {} })
//     expect(subject.hasTalents).toBe(true)
//   })

//   it('should have correct hasTags when has no tags', () => {
//     const subject = new FullEvent({ venue: {} })
//     expect(subject.hasTags).toBe(false)
//   })

//   it('should have correct hasTags when has tags', () => {
//     const subject = new FullEvent({
//       mediumTags: [{ id: '1', label: 'one' }],
//       venue: {}
//     })

//     expect(subject.hasTags).toBe(true)
//   })

//   it('should have correct description', () => {
//     const subject = new FullEvent({
//       description: 'Some description',
//       venue: {}
//     })

//     expect(subject.description).toBe('Some description')
//   })

//   it('should have correct descriptionCredit', () => {
//     const subject = new FullEvent({
//       descriptionCredit: 'Some description credit',
//       venue: {}
//     })

//     expect(subject.descriptionCredit).toBe('Some description credit')
//   })

//   it('should have correct weSay', () => {
//     const subject = new FullEvent({ weSay: 'We say', venue: {} })
//     expect(subject.weSay).toBe('We say')
//   })

//   it('should have correct createEventMediumDescription when has more than two mediums', () => {
//     const subject = new FullEvent({
//       mediumTags: [
//         { id: 'medium/painting', label: 'painting' },
//         { id: 'medium/drawing', label: 'drawing' },
//         { id: 'medium/sculpture', label: 'sculpture' }
//       ],
//       venue: {}
//     })

//     expect(subject.createEventMediumDescription()).toBe('mixed media')
//   })

//   it('should have correct createEventMediumDescription when has two mediums', () => {
//     const subject = new FullEvent({
//       mediumTags: [
//         { id: 'medium/painting', label: 'painting' },
//         { id: 'medium/drawing', label: 'drawing' }
//       ],
//       venue: {}
//     })

//     expect(subject.createEventMediumDescription()).toBe('painting / drawing')
//   })

//   it('should have correct createEventMediumDescription when has one medium', () => {
//     const subject = new FullEvent({
//       mediumTags: [{ id: 'medium/painting', label: 'painting' }],
//       venue: {}
//     })

//     expect(subject.createEventMediumDescription()).toBe('painting')
//   })

//   it('should have correct createEventMediumDescription when has no mediums', () => {
//     const subject = new FullEvent({
//       mediumTags: [],
//       venue: {}
//     })

//     expect(subject.createEventMediumDescription()).toBe('unknown medium')
//   })

//   it('should create an info bar label', () => {
//     const subject = new FullEvent({
//       mediumTags: [
//         { id: 'medium/painting', label: 'painting' },
//         { id: 'medium/drawing', label: 'drawing' },
//         { id: 'medium/sculpture', label: 'sculpture' }
//       ],
//       venue: {}
//     })

//     expect(subject.getInfoBarLabel()).toBe('mixed media')
//   })

//   it('should create a full description', () => {
//     eventLib.formatEventOccurrenceForDisplay = jest
//       .fn()
//       .mockReturnValue('Full description')

//     const subject = new FullEvent({
//       occurrenceType: occurrenceType.BOUNDED,
//       eventType: eventType.PERFORMANCE,
//       dateFrom: '2017/01/01',
//       dateTo: '2017/02/01',
//       additionalPerformances: [],
//       venue: {}
//     })

//     expect(subject.createEventOccurrenceDescriptionOn('2017/01/22')).toBe(
//       'Full description'
//     )

//     expect(eventLib.formatEventOccurrenceForDisplay).toBeCalledWith(
//       occurrenceType.BOUNDED,
//       eventType.PERFORMANCE,
//       '2017/01/01',
//       '2017/02/01',
//       [],
//       '2017/01/22'
//     )
//   })

//   it('should create a cost description', () => {
//     eventLib.formatCostForDisplay = jest
//       .fn()
//       .mockReturnValue('Cost description')

//     const subject = new FullEvent({
//       costType: costType.PAID,
//       costFrom: 1,
//       costTo: 2,
//       venue: {}
//     })

//     expect(subject.createCostDescription()).toBe('Cost description')

//     expect(eventLib.formatCostForDisplay).toBeCalledWith(
//       costType.PAID,
//       1,
//       2
//     )
//   })

//   it('should create a booking description', () => {
//     eventLib.formatBookingInfoForDisplay = jest
//       .fn()
//       .mockReturnValue('Booking description')

//     const subject = new FullEvent({
//       bookingType: bookingType.REQUIRED,
//       bookingOpens: '2017/01/20',
//       links: [],
//       venue: {}
//     })

//     expect(subject.createBookingDescriptionOn('2017/01/21')).toBe(
//       'Booking description'
//     )

//     expect(eventLib.formatBookingInfoForDisplay).toBeCalledWith(
//       bookingType.REQUIRED,
//       '2017/01/20',
//       { _links: [] },
//       '2017/01/21'
//     )
//   })

//   it('should create times details', () => {
//     timeLib.getTimesDetails = jest.fn().mockReturnValue('Times details')

//     const subject = new FullEvent({ venue: {} })

//     expect(subject.createTimesDetailsOn('2017/01/20')).toBe('Times details')

//     expect(timeLib.getTimesDetails).toBeCalledWith(
//       { venue: {} },
//       entityType.EVENT,
//       '2017/01/20'
//     )
//   })

//   it('should get the homepage URL', () => {
//     const subject = new FullEvent({
//       links: [{ type: linkType.HOMEPAGE, url: '/some/url' }],
//       venue: {}
//     })

//     expect(subject.getHomepageUrl()).toEqual('/some/url')
//   })

//   it('should get the homepage URL when there is none', () => {
//     const subject = new FullEvent({ links: [], venue: {} })
//     expect(subject.getHomepageUrl()).toEqual(null)
//   })

//   it('should have correct getPin', () => {
//     const subject = new FullEvent({ venue: { latitude: 2, longitude: 3 } })
//     expect(subject.getPin()).toEqual({ lat: 2, lng: 3 })
//   })

//   it('should clone correctly', () => {
//     const source = new FullEvent({ name: 'source', venue: {} })
//     const copy = source.createShallowClone()

//     copy.entity.name = 'copy'

//     expect(source.name).toBe('source')
//     expect(copy.name).toBe('copy')
//   })
// })
