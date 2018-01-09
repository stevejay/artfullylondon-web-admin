import { handleActions } from 'redux-actions'
import {
  ENTITY_TYPE_ALL,
  ENTITY_TYPE_EVENT,
  ENTITY_TYPE_EVENT_SERIES,
  ENTITY_TYPE_VENUE,
  ENTITY_TYPE_TALENT
} from '_src/constants/entity'
import {
  AUTOCOMPLETE_ITEM_TYPE_ENTITY,
  AUTOCOMPLETE_ITEM_TYPE_LABEL
} from '_src/constants/search'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import * as searchConstants from '_src/constants/search'
import * as authTypes from '_src/constants/auth'

const initialState = {
  searchInProgress: false,
  canShowNoResultsMessage: false,
  basicSearchParams: {
    entityType: ENTITY_TYPE_ALL,
    term: '',
    skip: 0,
    take: searchConstants.DEFAULT_TAKE
  },
  basicSearchResultParams: null,
  total: 0,
  items: [],
  autocompleteItems: []
}

export default handleActions(
  {
    [authTypes.LOGGED_OUT]: () => initialState,
    [searchConstants.BASIC_SEARCH_PAGE_ENTERED]: state => ({
      ...state,
      searchInProgress: false,
      canShowNoResultsMessage: false
    }),
    [searchConstants.SET_BASIC_SEARCH_PARAMS]: (state, action) => ({
      ...state,
      basicSearchParams: action.payload
    }),
    [searchConstants.STARTING_BASIC_SEARCH]: state => ({
      ...state,
      searchInProgress: true
    }),
    [searchConstants.BASIC_SEARCH_SUCCEEDED]: (state, action) => {
      const { total, items, params } = action.payload

      const events = items
        .filter(item => item.entityType === ENTITY_TYPE_EVENT)
        .map(item => new SummaryEvent(item))

      const eventSeries = items
        .filter(item => item.entityType === ENTITY_TYPE_EVENT_SERIES)
        .map(item => new SummaryEventSeries(item))

      const venues = items
        .filter(item => item.entityType === ENTITY_TYPE_VENUE)
        .map(item => new SummaryVenue(item))

      const talents = items
        .filter(item => item.entityType === ENTITY_TYPE_TALENT)
        .map(item => new SummaryTalent(item))

      return {
        ...state,
        searchInProgress: false,
        canShowNoResultsMessage: true,
        basicSearchResultParams: params,
        total,
        items: [...events, ...eventSeries, ...venues, ...talents]
      }
    },
    [searchConstants.BASIC_SEARCH_FAILED]: state => ({
      ...state,
      searchInProgress: false
    }),
    [searchConstants.AUTOCOMPLETE_SEARCH_SUCCEEDED]: (state, action) => {
      const { items } = action.payload

      items.forEach(
        item => (item.autocompleteItemType = AUTOCOMPLETE_ITEM_TYPE_ENTITY)
      )

      const events = items.filter(
        item =>
          item.entityType === ENTITY_TYPE_EVENT ||
          item.entityType === ENTITY_TYPE_EVENT_SERIES
      )

      const venues = items.filter(item => item.entityType === ENTITY_TYPE_VENUE)

      const talents = items.filter(
        item => item.entityType === ENTITY_TYPE_TALENT
      )

      const autocompleteItems = []

      _addLabelToAutocompleteItems(autocompleteItems, events, 'Events')
      _addLabelToAutocompleteItems(autocompleteItems, venues, 'Venues')
      _addLabelToAutocompleteItems(autocompleteItems, talents, 'Talents')

      return {
        ...state,
        autocompleteItems
      }
    },
    [searchConstants.CLEAR_AUTOCOMPLETE]: state => ({
      ...state,
      autocompleteItems: []
    })
  },
  initialState
)

function _addLabelToAutocompleteItems (autocompleteItems, items, label) {
  if (!items.length) {
    return
  }

  autocompleteItems.push({
    autocompleteItemType: AUTOCOMPLETE_ITEM_TYPE_LABEL,
    label: label
  })

  Array.prototype.push.apply(autocompleteItems, items)
}
