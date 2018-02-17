import { SummaryEventSeries, FullEventSeries } from '_src/entities/event-series'
import { LINK_TYPE_WIKIPEDIA } from '_src/constants/link'

describe('SummaryEventSeries', () => {
  it('should have correct entityType', () => {
    const subject = new SummaryEventSeries({})
    expect(subject.entityType).toBe('event-series')
  })

  it('should have correct entityTypeLabel', () => {
    const subject = new SummaryEventSeries({})
    expect(subject.entityTypeLabel).toBe('Event Series')
  })

  it('should have correct id', () => {
    const subject = new SummaryEventSeries({ id: 'some-id' })
    expect(subject.id).toBe('some-id')
  })

  it('should have correct key', () => {
    const subject = new SummaryEventSeries({ id: 'some-id' })
    expect(subject.key).toBe('some-id')
  })

  it('should have correct status', () => {
    const subject = new SummaryEventSeries({ status: 'Active' })
    expect(subject.status).toBe('Active')
  })

  it('should have correct name', () => {
    const subject = new SummaryEventSeries({ name: 'The Event Series' })
    expect(subject.name).toBe('The Event Series')
  })

  it('should have correct eventSeriesType', () => {
    const subject = new SummaryEventSeries({ eventSeriesType: 'Series' })
    expect(subject.eventSeriesType).toBe('Series')
  })

  it('should have correct eventSeriesTypeLabel for an occasional series', () => {
    const subject = new SummaryEventSeries({ eventSeriesType: 'Occasional' })
    expect(subject.eventSeriesTypeLabel).toBe('series')
  })

  it('should have correct eventSeriesTypeLabel for a season series', () => {
    const subject = new SummaryEventSeries({ eventSeriesType: 'Season' })
    expect(subject.eventSeriesTypeLabel).toBe('season')
  })

  it('should have correct occurrence', () => {
    const subject = new SummaryEventSeries({ occurrence: 'Some occurrence' })
    expect(subject.occurrence).toBe('Some occurrence')
  })

  it('should have correct summary', () => {
    const subject = new SummaryEventSeries({ summary: 'Summary' })
    expect(subject.summary).toBe('Summary')
  })

  it('should have correct url', () => {
    const subject = new SummaryEventSeries({ id: 'some-series' })
    expect(subject.url).toBe('/event-series/some-series')
  })

  it('should have correct editUrl', () => {
    const subject = new SummaryEventSeries({ id: 'some-series' })
    expect(subject.editUrl).toBe('/event-series/edit/some-series')
  })

  it('should have correct image', () => {
    const subject = new SummaryEventSeries({ image: '123456' })
    expect(subject.image).toBe('123456')
  })

  it('should have correct imageCopyright', () => {
    const subject = new SummaryEventSeries({ imageCopyright: 'The copyright' })
    expect(subject.imageCopyright).toBe('The copyright')
  })

  it('should have correct imageRatio', () => {
    const subject = new SummaryEventSeries({ imageRatio: 2 })
    expect(subject.imageRatio).toBe(2)
  })

  it('should have correct hasImage when has image', () => {
    const subject = new SummaryEventSeries({ image: '123456' })
    expect(subject.hasImage).toBe(true)
  })

  it('should have correct hasImage when has no image', () => {
    const subject = new SummaryEventSeries({ image: null })
    expect(subject.hasImage).toBe(false)
  })

  it('should have correct isFullEntity', () => {
    const subject = new SummaryEventSeries({})
    expect(subject.isFullEntity).toBe(false)
  })
})

describe('FullEventSeries', () => {
  it('should have correct images', () => {
    const subject = new FullEventSeries({ images: [{ id: 'some-id' }] })
    expect(subject.images).toEqual([{ id: 'some-id' }])
  })

  it('should have correct description', () => {
    const subject = new FullEventSeries({ description: 'Some description' })
    expect(subject.description).toBe('Some description')
  })

  it('should have correct descriptionCredit', () => {
    const subject = new FullEventSeries({
      descriptionCredit: 'Some description credit'
    })
    expect(subject.descriptionCredit).toBe('Some description credit')
  })

  it('should have correct weSay', () => {
    const subject = new FullEventSeries({ weSay: 'We say' })
    expect(subject.weSay).toBe('We say')
  })

  it('should have correct isFullEntity', () => {
    const subject = new FullEventSeries({})
    expect(subject.isFullEntity).toBe(true)
  })

  it('should have correct createInfoBarLabel for an occasional series', () => {
    const subject = new FullEventSeries({ eventSeriesType: 'Occasional' })
    expect(subject.createInfoBarLabel()).toBe('Occasional Series')
  })

  it('should have correct createInfoBarLabel for a season series', () => {
    const subject = new FullEventSeries({ eventSeriesType: 'Season' })
    expect(subject.createInfoBarLabel()).toBe('Season Series')
  })

  it('should create a formatted description', () => {
    const subject = new FullEventSeries({
      description: 'The Description',
      descriptionCredit: 'The Credit'
    })

    expect(subject.createFormattedDescription()).toBe(
      'The Description<p><em>(Description by The Credit.)</em></p>'
    )
  })

  it('should get a link by type', () => {
    const wikipediaLink = { type: LINK_TYPE_WIKIPEDIA }

    const subject = new FullEventSeries({
      links: [wikipediaLink]
    })

    expect(subject.getLinkByType(LINK_TYPE_WIKIPEDIA)).toBe(wikipediaLink)
  })
})
