import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SectionsContainer from '_src/components/section/sections-container'
import BasicSection from '_src/components/section/basic'
import CopyrightFooter from '_src/components/copyright-footer'
import Loader from '_src/components/loader'
import { getTodayDateAsString } from '_src/lib/time'
import { ENTITY_TYPE_ALL } from '_src/constants/entity'
import {
  DEFAULT_TAKE,
  ALLOWED_BASIC_SEARCH_ENTITY_TYPES
} from '_src/constants/search'
import { pushBasicSearchToUrl } from '_src/actions/search'
import NoResults from '_src/components/search/no-results'
import SearchResults from '_src/components/search/results'
import BasicSearchForm from '_src/containers/forms/basic-search'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'
import './index.m.scss'

class BasicSearch extends React.Component {
  handlePageClick = pageNumber => {
    this.props.pushBasicSearchToUrl({
      query: this.props.resultParams,
      skip: (pageNumber - 1) * DEFAULT_TAKE,
      take: DEFAULT_TAKE
    })
  }
  handleSubmit = params => {
    this.props.pushBasicSearchToUrl({
      query: params,
      skip: 0,
      take: DEFAULT_TAKE
    })
  }
  handleMoreResultsClick = ({ entityType }) => {
    const { resultParams, pushBasicSearchToUrl } = this.props
    const queryCopy = Object.assign({}, resultParams, { entityType })
    pushBasicSearchToUrl({ query: queryCopy })
  }
  handleTryAllClick = () => {
    const { resultParams, pushBasicSearchToUrl } = this.props

    const queryCopy = Object.assign({}, resultParams, {
      entityType: ENTITY_TYPE_ALL,
      skip: 0
    })

    pushBasicSearchToUrl({ query: queryCopy })
  }
  render () {
    const {
      searchInProgress,
      resultParams,
      canShowNoResultsMessage,
      items,
      total
    } = this.props

    const dateStr = getTodayDateAsString()
    const hasResults = !!resultParams && items.length > 0

    const isAllSearch =
      !!resultParams && resultParams.entityType === ENTITY_TYPE_ALL

    return (
      <SectionsContainer>
        <BasicSection styleName='form-container'>
          <BasicSearchForm onSubmit={this.handleSubmit} />
        </BasicSection>
        <BasicSection styleName='search-results-section'>
          {searchInProgress && <Loader size='massive' />}
          {!searchInProgress &&
            !hasResults &&
            canShowNoResultsMessage &&
            <NoResults
              entityType={resultParams.entityType}
              onTryAllClick={this.handleTryAllClick}
            />}
          {!searchInProgress &&
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
            />}
        </BasicSection>
        <CopyrightFooter />
      </SectionsContainer>
    )
  }
}

BasicSearch.propTypes = {
  searchInProgress: PropTypes.bool.isRequired,
  canShowNoResultsMessage: PropTypes.bool.isRequired,
  resultParams: PropTypes.shape({
    entityType: PropTypes.oneOf(ALLOWED_BASIC_SEARCH_ENTITY_TYPES).isRequired,
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
  pushBasicSearchToUrl: PropTypes.func.isRequired
}

export default connect(
  state => ({
    resultParams: state.search.basicSearchResultParams,
    total: state.search.total,
    items: state.search.items,
    searchInProgress: state.search.searchInProgress,
    canShowNoResultsMessage: state.search.canShowNoResultsMessage
  }),
  dispatch => ({
    pushBasicSearchToUrl: bindActionCreators(pushBasicSearchToUrl, dispatch)
  })
)(BasicSearch)
