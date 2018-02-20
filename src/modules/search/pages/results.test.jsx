import React from 'react'
import _ from 'lodash'

import { SearchResultsPage } from './results'
import { SummaryVenue } from '_src/domain/venue'
import SearchResults from '../components/search/results'
import BasicSearchForm from '../forms/basic-search'
import NoResults from '../components/search/no-results'
import * as dateLib from '_src/shared/lib/date'
import * as globalConstants from '_src/shared/constants'
import * as searchConstants from '../constants'
import * as searchActions from '../actions'
import entityType from '_src/domain/types/entity-type'

dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

it('should render correctly when search returned results', () => {
  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{
        entityType: 'venue',
        skip: 10,
        take: 20
      }}
      total={100}
      items={[new SummaryVenue({})]}
      location={{ search: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when search has yet to be triggered', () => {
  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={null}
      location={{ search: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when search returned no results', () => {
  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{
        entityType: 'venue',
        skip: 10,
        take: 20
      }}
      total={100}
      items={[]}
      location={{ search: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when search returned no results and there are no result params', () => {
  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={[]}
      location={{ search: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when search is in progress', () => {
  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress
      resultParams={{
        entityType: 'venue',
        skip: 10,
        take: 20
      }}
      total={100}
      items={[new SummaryVenue({})]}
      location={{ search: null }}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger a search on construction when there is a search', () => {
  const dispatch = jest.fn()

  shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={null}
      location={{ search: '?term=bar' }}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.search({
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term: 'bar' }
    })
  )
})

it('should not trigger a search on construction when there is none', () => {
  const dispatch = jest.fn()

  shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={null}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  expect(dispatch).not.toHaveBeenCalled()
})

it('should not trigger a search when the location search does not change', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={null}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper.instance().componentWillReceiveProps({ location: { search: null } })

  expect(dispatch).not.toHaveBeenCalled()
})

it('should trigger a search when the location search changes', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={null}
      total={100}
      items={null}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper
    .instance()
    .componentWillReceiveProps({ location: { search: '?term=bar' } })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.search({
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term: 'bar' }
    })
  )
})

it('should handle a pagination click', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{ entityType: 'venue', skip: 10, take: 20 }}
      total={100}
      items={[new SummaryVenue({})]}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(SearchResults).prop('onPageClick')(6)

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.pushBasicSearchToUrl({
      query: { entityType: 'venue', skip: 10, take: 20 },
      skip: 5 * globalConstants.DEFAULT_TAKE,
      take: globalConstants.DEFAULT_TAKE
    })
  )
})

it('should handle submitting a search', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{ entityType: 'venue', skip: 10, take: 20 }}
      total={100}
      items={[new SummaryVenue({})]}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(BasicSearchForm).prop('onSubmit')({ term: 'bat' })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.pushBasicSearchToUrl({
      query: { term: 'bat' },
      skip: 0,
      take: globalConstants.DEFAULT_TAKE
    })
  )
})

it('should handle a more results click', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{ entityType: 'venue', skip: 10, take: 20 }}
      total={100}
      items={[new SummaryVenue({})]}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(SearchResults).prop('onMoreResultsClick')({
    entityType: 'talent'
  })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.pushBasicSearchToUrl({
      query: {
        entityType: 'talent',
        skip: 10,
        take: 20
      }
    })
  )
})

it('should handle a try all click', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <SearchResultsPage
      searchInProgress={false}
      resultParams={{
        entityType: 'venue',
        skip: 10,
        take: 20
      }}
      total={100}
      items={[]}
      location={{ search: null }}
      dispatch={dispatch}
    />
  )

  wrapper.find(NoResults).prop('onTryAllClick')()

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.pushBasicSearchToUrl({
      query: {
        take: 20,
        entityType: entityType.ALL,
        skip: 0
      }
    })
  )
})
