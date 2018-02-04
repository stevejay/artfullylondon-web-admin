import {
  createCard
} from '_src/components/search-results-cards/card-content-factory'
import EventCardContent
  from '_src/components/search-results-cards/event-card-content'
import EventSeriesCardContent
  from '_src/components/search-results-cards/event-series-card-content'
import TalentCardContent
  from '_src/components/search-results-cards/talent-card-content'
import VenueCardContent
  from '_src/components/search-results-cards/venue-card-content'
import * as constants from '_src/constants/entity'

describe('createCard', () => {
  it('should create a card for an event', () => {
    const actual = createCard(constants.ENTITY_TYPE_EVENT)
    expect(actual).toEqual(EventCardContent)
  })

  it('should create a card for an event series', () => {
    const actual = createCard(constants.ENTITY_TYPE_EVENT_SERIES)
    expect(actual).toEqual(EventSeriesCardContent)
  })

  it('should create a card for a talent', () => {
    const actual = createCard(constants.ENTITY_TYPE_TALENT)
    expect(actual).toEqual(TalentCardContent)
  })

  it('should create a card for a venue', () => {
    const actual = createCard(constants.ENTITY_TYPE_VENUE)
    expect(actual).toEqual(VenueCardContent)
  })
})
