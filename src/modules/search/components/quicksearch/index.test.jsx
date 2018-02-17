import React from 'react'
import _ from 'lodash'

import { Quicksearch } from './index'
import * as searchActions from '../../actions'
import entityType from '_src/entities/entity-type'
import QuicksearchForm from '../../forms/quicksearch'

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

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.pushBasicSearchToUrl({
      query: { term: 'foo', entityType: 'venue' }
    })
  )
})

describe('shouldComponentUpdate', () => {
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
})

it('should handle an autocomplete search event', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Quicksearch show onHide={_.noop} dispatch={dispatch} />
  )

  wrapper.find(QuicksearchForm).prop('onAutocompleteSearch')({
    term: 'some term'
  })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.autocompleteSearch(
      'some term',
      entityType.ALL
    )
  )
})

it('should handle selection of an autocomplete result', () => {
  const dispatch = jest.fn()
  const handleHide = jest.fn()

  const wrapper = shallow(
    <Quicksearch show onHide={handleHide} dispatch={dispatch} />
  )

  wrapper.find(QuicksearchForm).prop('onAutocompleteSelect')({
    id: 'some-entity-id'
  })

  expect(handleHide).toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.navigateToEntity({ id: 'some-entity-id' })
  )
})
