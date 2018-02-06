import React from 'react'
import _ from 'lodash'

import { TagCollection } from './tag-collection'
import Tag from '_src/modules/tag/components/tag'

it('should render correctly when loading', () => {
  const wrapper = shallow(
    <TagCollection
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
    <TagCollection
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
    <TagCollection
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
    <TagCollection
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
    <TagCollection
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
    <TagCollection
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

  wrapper.find(Tag).at(0).prop('onDelete')('medium/one')

  expect(setDeletingTagId).toHaveBeenCalledWith('medium/one')
  expect(handleDelete).toHaveBeenCalledWith('medium/one')
})
