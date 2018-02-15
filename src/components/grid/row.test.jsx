import React from 'react'
import _ from 'lodash'
import Close from 'react-icons/lib/fa/close'

import GridRow from '_src/components/grid/row'
import * as browserConstants from '_src/constants/browser'

it('should render correctly when can delete', () => {
  const wrapper = shallow(
    <GridRow id='some-id' onDelete={_.noop}><div id='child' /></GridRow>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when cannot delete', () => {
  const wrapper = shallow(<GridRow id='some-id'><div id='child' /></GridRow>)
  expect(wrapper).toMatchSnapshot()
})

it('should handle an Enter key press to delete the row', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <GridRow id='some-id' onDelete={handleDelete}><div id='child' /></GridRow>
  )

  wrapper
    .find(Close)
    .simulate('keyPress', { charCode: browserConstants.ENTER_CHARCODE })

  expect(handleDelete).toHaveBeenCalledWith('some-id')
})

it('should ignore an non-Enter key press to delete the row', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <GridRow id='some-id' onDelete={handleDelete}><div id='child' /></GridRow>
  )

  wrapper
    .find(Close)
    .simulate('keyPress', { charCode: browserConstants.ENTER_CHARCODE + 1 })

  expect(handleDelete).not.toHaveBeenCalled()
})

it('should handle a click on the close icon to delete the row', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <GridRow id='some-id' onDelete={handleDelete}><div id='child' /></GridRow>
  )

  wrapper.find(Close).simulate('click')

  expect(handleDelete).toHaveBeenCalledWith('some-id')
})
