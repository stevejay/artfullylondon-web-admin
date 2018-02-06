import React from 'react'
import _ from 'lodash'

import { TagsTypePage } from './tags-type'
import * as tagActions from '_src/modules/tag/actions'
import TagCollection from '_src/modules/tag/components/tag-collection'
import AddTagForm from '_src/modules/tag/forms/add-tag'

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

  wrapper.find(TagCollection).prop('onDelete')('medium/two')

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

  wrapper.instance().componentWillReceiveProps({ tagType: 'audience' })

  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags('medium'))
  expect(dispatch).toHaveBeenCalledWith(tagActions.getTags('audience'))
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

  wrapper.instance().componentWillReceiveProps({ tagType: 'medium' })

  expect(dispatch).not.toHaveBeenCalledWith(tagActions.getTags('audience'))
})
