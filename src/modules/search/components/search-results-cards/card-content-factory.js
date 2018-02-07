import * as constants from '_src/constants/entity'
import EventCardContent
  from '_src/modules/search/components/search-results-cards/event-card-content'
import EventSeriesCardContent
  from '_src/modules/search/components/search-results-cards/event-series-card-content'
import TalentCardContent
  from '_src/modules/search/components/search-results-cards/talent-card-content'
import VenueCardContent
  from '_src/modules/search/components/search-results-cards/venue-card-content'

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
