import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as searchActionTypes from '_src/constants/action/search'
import * as searchConstants from '_src/constants/search'
import { Quicksearch } from '_src/modules/quicksearch'

it('should render correctly', () => {
  const wrapper = shallow(
    <Quicksearch show onHide={_.noop} dispatch={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle hiding the quicksearch', () => {
  const handleHide = jest.fn()
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Quicksearch show onHide={handleHide} dispatch={dispatch} />
  )

  wrapper.find('Modal').prop('onHide')()

  expect(handleHide).toHaveBeenCalled()
})

it('should handle submitting the quicksearch form', () => {
  const handleHide = jest.fn()
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Quicksearch show onHide={handleHide} dispatch={dispatch} />
  )

  wrapper.find('ReduxForm').prop('onSubmit')({
    term: 'foo',
    entityType: 'venue'
  })

  expect(handleHide).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalledWith({
    type: searchActionTypes.PUSH_BASIC_SEARCH_TO_URL,
    payload: {
      searchType: searchConstants.SEARCH_TYPE_BASIC,
      query: { term: 'foo', entityType: 'venue' }
    }
  })
})

it('should update the component when props change', () => {
  const wrapper = shallow(
    <Quicksearch show onHide={_.noop} dispatch={_.noop} />
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: false })
  expect(result).toEqual(true)
})

it('should not update the component when props do not change', () => {
  const wrapper = shallow(
    <Quicksearch show onHide={_.noop} dispatch={_.noop} />
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: true })
  expect(result).toEqual(false)
})
