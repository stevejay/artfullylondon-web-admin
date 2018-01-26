import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import AltBackground from '_src/components/section/alt-background'
import BasicSection from '_src/components/section/basic'
import BoxesLoader from '_src/components/loader/boxes'
import NoResults from '_src/components/search/no-results'
import SearchResults from '_src/components/search/results'
import SectionHeading from '_src/components/section/heading'
import BasicSearchForm from '_src/modules/search/forms/basic-search'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import * as timeLib from '_src/lib/time'
import * as entityConstants from '_src/constants/entity'
import * as searchConstants from '_src/constants/search'
import * as searchActionTypes from '_src/constants/action/search'
import './results.scss'

class SearchResultsPage extends React.Component {
  constructor (props) {
    super(props)
    this._search(props.location)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this._search(nextProps.location)
    }
  }
  handlePageClick = pageNumber => {
    this._pushBasicSearchToUrl({
      query: this.props.resultParams,
      skip: (pageNumber - 1) * searchConstants.DEFAULT_TAKE,
      take: searchConstants.DEFAULT_TAKE
    })
  }
  handleAutocompleteSearch = query => {
    return this.props.dispatch({
      type: searchActionTypes.SEARCH,
      payload: {
        searchType: searchConstants.SEARCH_TYPE_AUTOCOMPLETE,
        query
      },
      meta: { thunk: true }
    })
  }
  handleAutocompleteSelect = entity => {
    this.props.dispatch({
      type: searchActionTypes.NAVIGATE_TO_ENTITY,
      payload: entity
    })
  }
  handleSubmit = params => {
    this._pushBasicSearchToUrl({
      query: params,
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    })
  }
  handleMoreResultsClick = ({ entityType }) => {
    this._pushBasicSearchToUrl({
      query: {
        ...this.props.resultParams,
        entityType
      }
    })
  }
  handleTryAllClick = () => {
    this._pushBasicSearchToUrl({
      query: {
        ...this.props.resultParams,
        entityType: entityConstants.ENTITY_TYPE_ALL,
        skip: 0
      }
    })
  }
  _pushBasicSearchToUrl (payload) {
    this.props.dispatch({
      type: searchActionTypes.PUSH_BASIC_SEARCH_TO_URL,
      payload
    })
  }
  _search (location) {
    if (!_.isEmpty(location.search)) {
      this.props.dispatch({
        type: searchActionTypes.SEARCH,
        payload: {
          searchType: searchConstants.SEARCH_TYPE_BASIC,
          query: queryString.parse(location.search)
        }
      })
    }
  }
  render () {
    const {
      searchInProgress,
      resultParams,
      canShowNoResultsMessage,
      items,
      total
    } = this.props

    const dateStr = timeLib.getTodayDateAsString()
    const hasResults = !!resultParams && items.length > 0

    const isAllSearch =
      hasResults && resultParams.entityType === entityConstants.ENTITY_TYPE_ALL

    const noResults =
      !searchInProgress && !hasResults && canShowNoResultsMessage

    return (
      <BasicSection>
        <SectionHeading>
          <span>Quick</span>&nbsp;Search
        </SectionHeading>
        <BasicSearchForm
          onSubmit={this.handleSubmit}
          onAutocompleteSearch={this.handleAutocompleteSearch}
          onAutocompleteSelect={this.handleAutocompleteSelect}
        />
        <AltBackground styleName='results-container'>
          {searchInProgress && <BoxesLoader />}
          {/* <FadeTransition in={noResults} appear mountOnEnter unmountOnExit> */}
          {noResults &&
            <NoResults
              entityType={resultParams ? resultParams.entityType : null}
              onTryAllClick={this.handleTryAllClick}
            />}
          {/* </FadeTransition> */}
          {/* {!searchInProgress &&
            hasResults &&
            <SearchResults
              items={items}
              total={total}
              skip={resultParams.skip}
              take={resultParams.take}
              isAllSearch={isAllSearch}
              dateStr={dateStr}
              onPageClick={this.handlePageClick}
              onMoreResultsClick={this.handleMoreResultsClick}
            />} */}
          <FadeTransition
            in={!searchInProgress && hasResults}
            appear
            mountOnEnter
            unmountOnExit
          >
            <SearchResults
              items={items}
              total={total}
              skip={resultParams ? resultParams.skip : 0}
              take={resultParams ? resultParams.take : 0}
              isAllSearch={isAllSearch}
              dateStr={dateStr}
              onPageClick={this.handlePageClick}
              onMoreResultsClick={this.handleMoreResultsClick}
            />
          </FadeTransition>
        </AltBackground>
      </BasicSection>
    )
  }
}

SearchResultsPage.propTypes = {
  searchInProgress: PropTypes.bool.isRequired,
  canShowNoResultsMessage: PropTypes.bool.isRequired,
  resultParams: PropTypes.shape({
    entityType: PropTypes.oneOf(
      searchConstants.ALLOWED_BASIC_SEARCH_ENTITY_TYPES
    ).isRequired,
    skip: PropTypes.number.isRequired,
    take: PropTypes.number.isRequired
  }),
  total: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(SummaryEvent),
      PropTypes.instanceOf(SummaryEventSeries),
      PropTypes.instanceOf(SummaryTalent),
      PropTypes.instanceOf(SummaryVenue)
    ]).isRequired
  ).isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  resultParams: state.search.basicSearchResultParams,
  total: state.search.total,
  items: state.search.items,
  searchInProgress: state.search.searchInProgress,
  canShowNoResultsMessage: state.search.canShowNoResultsMessage
}))(SearchResultsPage)
