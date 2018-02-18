import { handleActions } from 'redux-actions'

import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import * as searchActions from '../actions'
import { actions as userActions } from '_src/modules/user'
import * as globalConstants from '_src/constants'
import entityType from '_src/entities/entity-type'

const initialState = {
  searchInProgress: false,
  basicSearchParams: {
    entityType: entityType.ALL,
    term: '',
    skip: 0,
    take: globalConstants.DEFAULT_TAKE
  },
  basicSearchResultParams: null,
  total: 0,
  items: null
}

export const reducer = handleActions(
  {
    [searchActions.types.SET_BASIC_SEARCH_PARAMS]: (state, action) => ({
      ...state,
      basicSearchParams: action.payload
    }),
    [searchActions.types.STARTING_BASIC_SEARCH]: state => ({
      ...state,
      searchInProgress: true
    }),
    [searchActions.types.BASIC_SEARCH_SUCCEEDED]: (state, action) => {
      const { total, items, params } = action.payload

      const events = items
        .filter(item => item.entityType === entityType.EVENT)
        .map(item => new SummaryEvent(item))

      const eventSeries = items
        .filter(item => item.entityType === entityType.EVENT_SERIES)
        .map(item => new SummaryEventSeries(item))

      const venues = items
        .filter(item => item.entityType === entityType.VENUE)
        .map(item => new SummaryVenue(item))

      const talents = items
        .filter(item => item.entityType === entityType.TALENT)
        .map(item => new SummaryTalent(item))

      return {
        ...state,
        searchInProgress: false,
        basicSearchResultParams: params,
        total,
        items: [...events, ...eventSeries, ...venues, ...talents]
      }
    },
    [searchActions.types.BASIC_SEARCH_FAILED]: state => ({
      ...state,
      searchInProgress: false
    }),
    [userActions.types.LOGGED_OUT]: () => initialState
  },
  initialState
)

export const selectors = {
  basicSearchInProgress: state => state.searchInProgress,
  basicSearchParams: state => state.basicSearchParams,
  basicSearchResultParams: state => state.basicSearchResultParams,
  basicSearchTotal: state => state.total,
  basicSearchItems: state => state.items
}
