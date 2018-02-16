import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import _ from 'lodash'

import FadeTransition from '_src/components/transition/fade'
import AltBackground from '_src/components/section/alt-background'
import BasicSection from '_src/components/section/basic'
import BoxesLoader from '_src/components/loader/boxes'
import NoResults from '../components/search/no-results'
import SearchResults from '../components/search/results'
import SectionHeading from '_src/components/section/heading'
import BasicSearchForm from '../forms/basic-search'
import { selectors as searchSelectors } from '../reducers'
import * as dateLib from '_src/lib/date'
import * as entityConstants from '_src/constants/entity'
import * as searchConstants from '../constants'
import * as searchActions from '../actions'
import * as entitiesPropTypes from '_src/entities/prop-types'
import './results.scss'

export class SearchResultsPage extends React.Component {
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
    this.props.dispatch(searchActions.pushBasicSearchToUrl(payload))
  }
  _search (location) {
    if (_.isEmpty(location.search)) {
      return
    }

    this.props.dispatch(
      searchActions.search({
        searchType: searchConstants.SEARCH_TYPE_BASIC,
        query: queryString.parse(location.search)
      })
    )
  }
  render () {
    const { searchInProgress, resultParams, items, total } = this.props

    const dateStr = dateLib.getTodayDateAsString()
    const hasResults = !!resultParams && !_.isEmpty(items)
    const noResults = !searchInProgress && !hasResults && !_.isNil(items)

    const isAllSearch =
      hasResults && resultParams.entityType === entityConstants.ENTITY_TYPE_ALL

    return (
      <BasicSection>
        <SectionHeading>
          <span>Quick</span>&nbsp;Search
        </SectionHeading>
        <BasicSearchForm onSubmit={this.handleSubmit} />
        <AltBackground styleName='results-container'>
          {searchInProgress && <BoxesLoader />}
          {noResults &&
            <NoResults
              entityType={resultParams ? resultParams.entityType : null}
              onTryAllClick={this.handleTryAllClick}
            />}
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
  resultParams: PropTypes.shape({
    entityType: PropTypes.oneOf(
      searchConstants.ALLOWED_BASIC_SEARCH_ENTITY_TYPES
    ).isRequired,
    skip: PropTypes.number.isRequired,
    take: PropTypes.number.isRequired
  }),
  total: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(entitiesPropTypes.SUMMARY_ENTITY.isRequired),
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(
  /* istanbul ignore next */
  state => ({
    resultParams: searchSelectors.basicSearchResultParams(state),
    total: searchSelectors.basicSearchTotal(state),
    items: searchSelectors.basicSearchItems(state),
    searchInProgress: searchSelectors.basicSearchInProgress(state)
  })
)(SearchResultsPage)
