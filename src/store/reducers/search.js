import { handleActions } from 'redux-actions'

import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import * as entityConstants from '_src/constants/entity'
import * as searchConstants from '_src/constants/search'
import * as searchActionTypes from '_src/constants/action/search'
import * as authActionTypes from '_src/constants/action/auth'

const initialState = {
  searchInProgress: false,
  basicSearchParams: {
    entityType: entityConstants.ENTITY_TYPE_ALL,
    term: '',
    skip: 0,
    take: searchConstants.DEFAULT_TAKE
  },
  basicSearchResultParams: null,
  total: 0,
  items: null
}

export default handleActions(
  {
    [authActionTypes.LOGGED_OUT]: () => initialState,
    [searchActionTypes.SET_BASIC_SEARCH_PARAMS]: (state, action) => ({
      ...state,
      basicSearchParams: action.payload
    }),
    [searchActionTypes.STARTING_BASIC_SEARCH]: state => ({
      ...state,
      searchInProgress: true
    }),
    [searchActionTypes.BASIC_SEARCH_SUCCEEDED]: (state, action) => {
      const { total, items, params } = action.payload

      const events = items
        .filter(item => item.entityType === entityConstants.ENTITY_TYPE_EVENT)
        .map(item => new SummaryEvent(item))

      const eventSeries = items
        .filter(
          item => item.entityType === entityConstants.ENTITY_TYPE_EVENT_SERIES
        )
        .map(item => new SummaryEventSeries(item))

      const venues = items
        .filter(item => item.entityType === entityConstants.ENTITY_TYPE_VENUE)
        .map(item => new SummaryVenue(item))

      const talents = items
        .filter(item => item.entityType === entityConstants.ENTITY_TYPE_TALENT)
        .map(item => new SummaryTalent(item))

      return {
        ...state,
        searchInProgress: false,
        basicSearchResultParams: params,
        total,
        items: [...events, ...eventSeries, ...venues, ...talents]
      }
    },
    [searchActionTypes.BASIC_SEARCH_FAILED]: state => ({
      ...state,
      searchInProgress: false
    })
    // [searchActionTypes.AUTOCOMPLETE_SEARCH_SUCCEEDED]: (state, action) => {
    //   const { items } = action.payload

    //   items.forEach(
    //     item =>
    //       (item.autocompleteItemType =
    //         searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY)
    //   )

    //   const events = items.filter(
    //     item =>
    //       item.entityType === entityConstants.ENTITY_TYPE_EVENT ||
    //       item.entityType === entityConstants.ENTITY_TYPE_EVENT_SERIES
    //   )

    //   const venues = items.filter(
    //     item => item.entityType === entityConstants.ENTITY_TYPE_VENUE
    //   )

    //   const talents = items.filter(
    //     item => item.entityType === entityConstants.ENTITY_TYPE_TALENT
    //   )

    //   const autocompleteItems = []

    //   _addLabelToAutocompleteItems(autocompleteItems, events, 'Events')
    //   _addLabelToAutocompleteItems(autocompleteItems, venues, 'Venues')
    //   _addLabelToAutocompleteItems(autocompleteItems, talents, 'Talents')

    //   return {
    //     ...state,
    //     autocompleteItems
    //   }
    // }
  },
  initialState
)

// function _addLabelToAutocompleteItems (autocompleteItems, items, label) {
//   if (!items.length) {
//     return
//   }

//   autocompleteItems.push({
//     autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_LABEL,
//     label: label
//   })

//   Array.prototype.push.apply(autocompleteItems, items)
// }
