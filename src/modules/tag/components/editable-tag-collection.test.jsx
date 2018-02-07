import React from 'react'
import _ from 'lodash'

import { EditableTagCollection } from './editable-tag-collection'
import EditableTag from '_src/modules/tag/components/editable-tag'

it('should render correctly when loading', () => {
  const wrapper = shallow(
    <EditableTagCollection
      tags={null}
      getInProgress
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
      getInProgress={false}
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
      getInProgress={false}
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
      getInProgress={false}
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
      getInProgress={false}
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
      getInProgress={false}
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