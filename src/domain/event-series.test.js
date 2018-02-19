import { SummaryEventSeries, FullEventSeries } from '_src/domain/event-series'

describe('SummaryEventSeries', () => {
  it('should construct an occasional event series', () => {
    const subject = new SummaryEventSeries({
      entityType: 'event-series',
      id: 'event-series-id',
      status: 'Active',
      name: 'Bang Said The Gun',
      eventSeriesType: 'Occasional',
      occurrence: 'Third Thursday of each month',
      summary: 'A poetry riot',
      image: 'abcd1234abcd1234abcd1234abcd1234',
      imageCopyright: 'Foo',
      imageRatio: 1.2
    })

    expect(subject.entityType).toEqual('event-series')
    expect(subject.id).toEqual('event-series-id')
    expect(subject.key).toEqual('event-series-id')
    expect(subject.name).toEqual('Bang Said The Gun')
    expect(subject.status).toEqual('Active')
    expect(subject.eventSeriesType).toEqual('Occasional')
    expect(subject.image).toEqual('abcd1234abcd1234abcd1234abcd1234')
    expect(subject.imageCopyright).toEqual('Foo')
    expect(subject.imageRatio).toEqual(1.2)
    expect(subject.hasImage).toEqual(true)
    expect(subject.entityTypeLabel).toEqual('Event Series')
    expect(subject.url).toEqual('/event-series/event-series-id')
    expect(subject.eventSeriesTypeLabel).toEqual('series')
  })

  it('should construct an season event series with no image', () => {
    const subject = new SummaryEventSeries({
      entityType: 'event-series',
      id: 'event-series-id',
      status: 'Active',
      name: 'Bang Said The Gun',
      eventSeriesType: 'Season',
      occurrence: 'Third Thursday of each month',
      summary: 'A poetry riot'
    })

    expect(subject.entityType).toEqual('event-series')
    expect(subject.id).toEqual('event-series-id')
    expect(subject.key).toEqual('event-series-id')
    expect(subject.name).toEqual('Bang Said The Gun')
    expect(subject.status).toEqual('Active')
    expect(subject.eventSeriesType).toEqual('Season')
    expect(subject.hasImage).toEqual(false)
    expect(subject.entityTypeLabel).toEqual('Event Series')
    expect(subject.url).toEqual('/event-series/event-series-id')
    expect(subject.eventSeriesTypeLabel).toEqual('season')
  })
})

describe('FullEventSeries', () => {
  it('should construct a full event series', () => {
    const subject = new FullEventSeries({
      id: 'event-series-id',
      status: 'Active',
      name: 'Bang Said The Gun',
      eventSeriesType: 'Occasional',
      occurrence: 'Third Thursday of each month',
      summary: 'A poetry riot',
      description: 'Poetry for people who dont like poetry.',
      descriptionCredit: 'Some description credit',
      links: [{ type: 'Wikipedia', url: 'https://en.wikipedia.org/foo' }],
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
    })

    expect(subject.name).toEqual('Bang Said The Gun')
    expect(subject.getInfoBarLabel()).toEqual('Occasional Series')
    expect(subject.editUrl).toEqual('/event-series/edit/event-series-id')
  })
})
