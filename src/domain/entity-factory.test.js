import * as entityFactory from './entity-factory'
import entityType from '_src/domain/types/entity-type'
import { FullEvent, SummaryEvent } from './event'
import { FullEventSeries, SummaryEventSeries } from './event-series'
import { FullTalent, SummaryTalent } from './talent'
import { FullVenue, SummaryVenue } from './venue'

describe('createEntity', () => {
  it('should handle creating an event', () => {
    const actual = entityFactory.createEntity(entityType.EVENT)
    expect(actual).toBeInstanceOf(FullEvent)
  })

  it('should handle creating an event series', () => {
    const actual = entityFactory.createEntity(entityType.EVENT_SERIES)
    expect(actual).toBeInstanceOf(FullEventSeries)
  })

  it('should handle creating a talent', () => {
    const actual = entityFactory.createEntity(entityType.TALENT)
    expect(actual).toBeInstanceOf(FullTalent)
  })

  it('should handle creating a venue', () => {
    const actual = entityFactory.createEntity(entityType.VENUE)
    expect(actual).toBeInstanceOf(FullVenue)
  })
})

describe('createSummaryEntity', () => {
  it('should handle creating an event', () => {
    const actual = entityFactory.createSummaryEntity(entityType.EVENT)
    expect(actual).toBeInstanceOf(SummaryEvent)
  })

  it('should handle creating an event series', () => {
    const actual = entityFactory.createSummaryEntity(entityType.EVENT_SERIES)
    expect(actual).toBeInstanceOf(SummaryEventSeries)
  })

  it('should handle creating a talent', () => {
    const actual = entityFactory.createSummaryEntity(entityType.TALENT)
    expect(actual).toBeInstanceOf(SummaryTalent)
  })

  it('should handle creating a venue', () => {
    const actual = entityFactory.createSummaryEntity(entityType.VENUE)
    expect(actual).toBeInstanceOf(SummaryVenue)
  })
})
