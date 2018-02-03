import {
  createCard
} from '_src/components/search-results-cards/card-content-factory'
import EventCardContent
  from '_src/components/search-results-cards/event-card-content'

describe('createCard', () => {
  it('should create a card for an event', () => {
    const actual = createCard('event')
    expect(actual).toEqual(EventCardContent)
  })
})
