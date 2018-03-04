import { SummaryEventSeries, FullEventSeries } from '_src/domain/event-series'
import entityType from '_src/domain/types/entity-type'

describe('SummaryEventSeries', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      entityType: entityType.EVENT_SERIES,
      id: 'event-series-id',
      status: statusType.ACTIVE,
      name: 'Bang Said The Gun',
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Third Thursday of each month',
      summary: 'A poetry riot',
      image: 'abcd1234abcd1234abcd1234abcd1234',
      imageCopyright: 'Foo',
      imageRatio: 1.2
    }
  })

  it('should handle getting the key', () => {
    const subject = new SummaryEventSeries(entity)
    expect(subject.key).toEqual('event-series-id')
  })

  it('should handle getEntityTypeLabel', () => {
    const subject = new SummaryEventSeries(entity)
    expect(subject.getEntityTypeLabel()).toEqual('Event Series')
  })

  describe('hasImage', () => {
    it('should handle having an image', () => {
      entity.image = '12345678123456781234567812345678'
      const subject = new SummaryEventSeries(entity)
      expect(subject.hasImage()).toEqual(true)
    })

    it('should handle having no image', () => {
      entity.image = null
      const subject = new SummaryEventSeries(entity)
      expect(subject.hasImage()).toEqual(false)
    })
  })

  it('should handle getUrl', () => {
    const subject = new SummaryEventSeries(entity)
    expect(subject.getUrl()).toEqual('/event-series/event-series-id')
  })

  describe('getEventSeriesTypeLabel', () => {
    it('should handle an occasional event series', () => {
      entity.eventSeriesType = eventSeriesType.OCCASIONAL
      const subject = new SummaryEventSeries(entity)
      expect(subject.getEventSeriesTypeLabel()).toEqual('series')
    })

    it('should handle a season event series', () => {
      entity.eventSeriesType = eventSeriesType.SEASON
      const subject = new SummaryEventSeries(entity)
      expect(subject.getEventSeriesTypeLabel()).toEqual('season')
    })
  })
})

describe('FullEventSeries', () => {
  let entity = null

  beforeEach(() => {
    entity = {
      id: 'event-series-id',
      status: statusType.ACTIVE,
      name: 'Bang Said The Gun',
      eventSeriesType: eventSeriesType.OCCASIONAL,
      occurrence: 'Third Thursday of each month',
      summary: 'A poetry riot',
      description: 'Poetry for people who dont like poetry.',
      descriptionCredit: 'Some description credit',
      links: [
        { type: linkType.WIKIPEDIA, url: 'https://en.wikipedia.org/foo' }
      ],
      images: [
        {
          id: 'abcd1234abcd1234abcd1234abcd1234',
          ratio: 1.2,
          copyright: 'Foo'
        }
      ],
      weSay: 'something',
      version: 1,
      schemeVersion: 3,
      createdDate: '2016/01/10',
      updatedDate: '2016/01/11'
    }
  })

  it('should get the entity type', () => {
    const subject = new FullEventSeries(entity)
    expect(subject.entityType).toEqual(entityType.EVENT_SERIES)
  })

  it('should handle getInfoBarLabel', () => {
    const subject = new FullEventSeries(entity)
    expect(subject.getInfoBarLabel()).toEqual('Occasional Series')
  })

  it('should handle getEditUrl', () => {
    const subject = new FullEventSeries(entity)
    expect(subject.getEditUrl()).toEqual('/event-series/edit/event-series-id')
  })
})
