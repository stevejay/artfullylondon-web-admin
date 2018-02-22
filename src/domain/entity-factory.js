import { FullEvent, SummaryEvent } from './event'
import { FullEventSeries, SummaryEventSeries } from './event-series'
import { FullTalent, SummaryTalent } from './talent'
import { FullVenue, SummaryVenue } from './venue'
import entityType from './types/entity-type'

export function createEntity (type, entity = null) {
  switch (type) {
    case entityType.EVENT:
      return new FullEvent(entity)
    case entityType.EVENT_SERIES:
      return new FullEventSeries(entity)
    case entityType.TALENT:
      return new FullTalent(entity)
    case entityType.VENUE:
      return new FullVenue(entity)
    /* istanbul ignore next */
    default:
      throw new Error(`entityType ${type} not supported`)
  }
}

export function createSummaryEntity (type, entity = null) {
  switch (type) {
    case entityType.EVENT:
      return new SummaryEvent(entity)
    case entityType.EVENT_SERIES:
      return new SummaryEventSeries(entity)
    case entityType.TALENT:
      return new SummaryTalent(entity)
    case entityType.VENUE:
      return new SummaryVenue(entity)
    /* istanbul ignore next */
    default:
      throw new Error(`entityType ${type} not supported`)
  }
}
