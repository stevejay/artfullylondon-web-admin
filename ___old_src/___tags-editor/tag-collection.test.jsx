import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TagsEditorTagCollection from '_src/components/tags-editor/tag-collection'
import Tag from '_src/components/tags-editor/tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <TagsEditorTagCollection
      value={[{ label: 'Some Label', id: 'some-id' }]}
      onDelete={_.noop}
      deleteInProgress={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are no tags', () => {
  const wrapper = shallow(
    <TagsEditorTagCollection
      value={[]}
      onDelete={_.noop}
      deleteInProgress={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the delete button being clicked', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <TagsEditorTagCollection
      value={[{ label: 'Some Label', id: 'some-id' }]}
      onDelete={handleDelete}
      deleteInProgress={false}
    />
  )

  wrapper.find(Tag).prop('onDelete')('the-key')

  expect(handleDelete).toHaveBeenCalledWith('the-key')
  expect(wrapper.state()).toEqual({ deletingTagId: 'the-key' })
})

it('should render a deleting tag correctly', () => {
  const wrapper = shallow(
    <TagsEditorTagCollection
      value={[{ label: 'Some Label', id: 'some-id' }]}
      onDelete={_.noop}
      deleteInProgress
    />
  )

  wrapper.find(Tag).prop('onDelete')('some-id')
  wrapper.update()

  expect(wrapper).toMatchSnapshot()
})
