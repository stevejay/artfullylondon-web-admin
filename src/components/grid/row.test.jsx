import React from 'react'
import _ from 'lodash'

import IconButton from '_src/components/button/icon'
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

it('should handle a click on the close icon to delete the row', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <GridRow id='some-id' onDelete={handleDelete}><div id='child' /></GridRow>
  )

  wrapper.find(IconButton).simulate('click')

  expect(handleDelete).toHaveBeenCalledWith('some-id')
})
