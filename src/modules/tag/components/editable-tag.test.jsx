import React from 'react'
import _ from 'lodash'

import EditableTag from './editable-tag'
import IconButton from '_src/components/button/icon'

it('should render correctly when not being deleted', () => {
  const wrapper = shallow(
    <EditableTag
      tag={{ id: 'medium/one', label: 'One' }}
      isBeingDeleted={false}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when being deleted', () => {
  const wrapper = shallow(
    <EditableTag
      tag={{ id: 'medium/one', label: 'One' }}
      isBeingDeleted
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the delete button being clicked', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <EditableTag
      tag={{ id: 'medium/one', label: 'One' }}
      isBeingDeleted={false}
      onDelete={handleDelete}
    />
  )

  wrapper.find(IconButton).simulate('click')

  expect(handleDelete).toHaveBeenCalledWith('medium/one')
})
