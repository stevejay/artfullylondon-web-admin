import entityType from '_src/entities/types/entity-type'
import EventCardContent from './event-card-content'
import EventSeriesCardContent from './event-series-card-content'
import TalentCardContent from './talent-card-content'
import VenueCardContent from './venue-card-content'

export function createCard (type) {
  switch (type) {
    case entityType.EVENT:
      return EventCardContent
    case entityType.EVENT_SERIES:
      return EventSeriesCardContent
    case entityType.TALENT:
      return TalentCardContent
    case entityType.VENUE:
      return VenueCardContent
    /* istanbul ignore next */
    default:
      throw new Error(`entityType is out of range: ${type}`)
  }
}
