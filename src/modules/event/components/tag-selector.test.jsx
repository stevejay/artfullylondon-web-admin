import React from 'react'
import _ from 'lodash'

import { TagSelector } from './tag-selector'
import Modal from '_src/shared/components/modal'
import { AddTagForm } from '_src/modules/tag'
import ButtonField from '_src/shared/components/button/field'

it('should render correctly when not showing the add tag modal', () => {
  const wrapper = shallow(
    <TagSelector
      tagType={tagType.MEDIUM}
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing={false}
      setShowing={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing the add tag modal', () => {
  const wrapper = shallow(
    <TagSelector
      tagType={tagType.MEDIUM}
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing
      setShowing={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle submitting the add tag form', () => {
  const onAddTag = jest.fn().mockReturnValue(Promise.resolve())

  const wrapper = shallow(
    <TagSelector
      tagType={tagType.MEDIUM}
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={onAddTag}
      showing
      setShowing={_.noop}
    />
  )

  wrapper.find(AddTagForm).simulate('submit', { name: 'foo' })

  expect(onAddTag).toHaveBeenCalledWith({ name: 'foo' })
})

it('should handle adding a tag', () => {
  const setShowing = jest.fn()

  const wrapper = shallow(
    <TagSelector
      tagType={tagType.MEDIUM}
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing={false}
      setShowing={setShowing}
    />
  )

  wrapper.find(ButtonField).simulate('click')

  expect(setShowing).toBeCalledWith(true)
})

it('should handle hiding the add tag modal', () => {
  const setShowing = jest.fn()

  const wrapper = shallow(
    <TagSelector
      tagType={tagType.MEDIUM}
      options={[{ id: 'a', label: 'A' }]}
      label='The Label'
      name='theName'
      onAddTag={_.noop}
      showing
      setShowing={setShowing}
    />
  )

  wrapper.find(Modal).simulate('hide')

  expect(setShowing).toBeCalledWith(false)
})
