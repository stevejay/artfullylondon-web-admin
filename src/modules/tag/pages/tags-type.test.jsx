import React from 'react'
import _ from 'lodash'

import { TagsTypePage } from './tags-type'
import * as tagActions from '../actions'
import EditableTagCollection from '../components/editable-tag-collection'
import AddTagForm from '../forms/add-tag'
import tagType from '_src/domain/types/tag-type'

it('should render correctly when get tags succeeded', () => {
  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get tags failed', () => {
  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed
      deleteInProgress={false}
      match={{}}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger getting the tags when created', () => {
  const dispatch = jest.fn()

  shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags('medium'))
})

it('should handle deleting a tag', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={dispatch}
    />
  )

  wrapper.find(EditableTagCollection).prop('onDelete')('medium/two')

  expect(dispatch).toHaveBeenCalledWith(tagActions.deleteTag('medium/two'))
})

it('should handle adding a tag', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={dispatch}
    />
  )

  wrapper.find(AddTagForm).prop('onSubmit')({ label: 'two' })

  expect(dispatch).toHaveBeenCalledWith(tagActions.addTag({ label: 'two' }))
})

it('should trigger getting tags when the tag type changes', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={dispatch}
    />
  )

  wrapper.instance().componentWillReceiveProps({ tagType: tagType.AUDIENCE })

  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags(tagType.MEDIUM))
  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags(tagType.AUDIENCE))
})

it('should not trigger getting tags when props change but the tag type does not', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TagsTypePage
      tagType='medium'
      tags={[{ id: 'medium/one', label: 'one' }]}
      getInProgress={false}
      getFailed={false}
      deleteInProgress={false}
      match={{}}
      dispatch={dispatch}
    />
  )

  wrapper.instance().componentWillReceiveProps({ tagType: tagType.MEDIUM })

  expect(dispatch).not.toHaveBeenCalledWith(
    tagActions.getTags(tagType.AUDIENCE)
  )
})
