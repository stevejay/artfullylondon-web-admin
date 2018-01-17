import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as searchConstants from '_src/constants/search'
import { Quicksearch } from '_src/modules/quicksearch'

it('should render correctly', () => {
  const wrapper = shallow(
    <Quicksearch
      show
      onHide={_.noop}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle hiding the quicksearch', () => {
  const handleHide = jest.fn()
  const clearAutocomplete = jest.fn()

  const wrapper = shallow(
    <Quicksearch
      show
      onHide={handleHide}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={clearAutocomplete}
    />
  )

  wrapper.find('Modal').prop('onHide')()

  expect(handleHide.mock.calls.length).toEqual(1)
  expect(clearAutocomplete.mock.calls.length).toEqual(1)
})

it('should handle submitting the quicksearch form', () => {
  const handleHide = jest.fn()
  const clearAutocomplete = jest.fn()
  const pushBasicSearchToUrl = jest.fn()

  const wrapper = shallow(
    <Quicksearch
      show
      onHide={handleHide}
      pushBasicSearchToUrl={pushBasicSearchToUrl}
      clearAutocomplete={clearAutocomplete}
    />
  )

  wrapper.find('ReduxForm').prop('onSubmit')({
    term: 'foo',
    entityType: 'venue'
  })

  expect(handleHide.mock.calls.length).toEqual(1)
  expect(clearAutocomplete.mock.calls.length).toEqual(1)
  expect(pushBasicSearchToUrl.mock.calls.length).toEqual(1)

  expect(pushBasicSearchToUrl.mock.calls[0]).toEqual([
    {
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term: 'foo', entityType: 'venue' }
    }
  ])
})

it('should update the component when props change', () => {
  const wrapper = shallow(
    <Quicksearch
      show
      onHide={_.noop}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={_.noop}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: false })
  expect(result).toEqual(true)
})

it('should not update the component when props do not change', () => {
  const wrapper = shallow(
    <Quicksearch
      show
      onHide={_.noop}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={_.noop}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: true })
  expect(result).toEqual(false)
})
