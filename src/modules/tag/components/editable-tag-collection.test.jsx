import React from 'react'
import _ from 'lodash'

import { EditableTagCollection } from './editable-tag-collection'
import EditableTag from './editable-tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={null}
      deletingTagId={null}
      deleteInProgress={false}
      onDelete={_.noop}
      setDeletingTagId={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when tags are null', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={null}
      deletingTagId={null}
      deleteInProgress={false}
      onDelete={_.noop}
      setDeletingTagId={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when no tags were loaded', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={[]}
      deletingTagId={null}
      deleteInProgress={false}
      onDelete={_.noop}
      setDeletingTagId={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when tags were loaded', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={[{ id: 'medium/one', label: 'One' }]}
      deletingTagId={null}
      deleteInProgress={false}
      onDelete={_.noop}
      setDeletingTagId={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when a tag is being deleted', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={[
        { id: 'medium/one', label: 'One' },
        { id: 'medium/two', label: 'Two' }
      ]}
      deletingTagId='medium/two'
      deleteInProgress
      onDelete={_.noop}
      setDeletingTagId={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle deleting a tag', () => {
  const handleDelete = jest.fn()
  const setDeletingTagId = jest.fn()

  const wrapper = shallow(
    <EditableTagCollection
      tags={[
        { id: 'medium/one', label: 'One' },
        { id: 'medium/two', label: 'Two' }
      ]}
      deletingTagId={null}
      deleteInProgress={false}
      onDelete={handleDelete}
      setDeletingTagId={setDeletingTagId}
    />
  )

  wrapper.find(EditableTag).at(0).prop('onDelete')('medium/one')

  expect(setDeletingTagId).toHaveBeenCalledWith('medium/one')
  expect(handleDelete).toHaveBeenCalledWith('medium/one')
})
