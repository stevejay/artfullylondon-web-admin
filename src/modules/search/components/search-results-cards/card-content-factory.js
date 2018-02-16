import * as constants from '_src/constants/entity'
import EventCardContent from './event-card-content'
import EventSeriesCardContent from './event-series-card-content'
import TalentCardContent from './talent-card-content'
import VenueCardContent from './venue-card-content'

export function createCard (entityType) {
  switch (entityType) {
    case constants.ENTITY_TYPE_EVENT:
      return EventCardContent
    case constants.ENTITY_TYPE_EVENT_SERIES:
      return EventSeriesCardContent
    case constants.ENTITY_TYPE_TALENT:
      return TalentCardContent
    case constants.ENTITY_TYPE_VENUE:
      return VenueCardContent
    /* istanbul ignore next */
    default:
      throw new Error(`entityType is out of range: ${entityType}`)
  }
}
