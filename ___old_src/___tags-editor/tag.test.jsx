import React from 'react'
import { shallow } from 'enzyme'
import CloseIcon from 'react-icons/lib/fa/close'
import _ from 'lodash'

import TagsEditorTag from '_src/components/tags-editor/tag'
import * as browserConstants from '_src/constants/browser'

it('should render correctly', () => {
  const wrapper = shallow(
    <TagsEditorTag
      value={{ label: 'Some Label', id: 'some-id' }}
      isBeingDeleted={false}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is being deleted', () => {
  const wrapper = shallow(
    <TagsEditorTag
      value={{ label: 'Some Label', id: 'some-id' }}
      isBeingDeleted
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a click on the delete button', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <TagsEditorTag
      value={{ label: 'Some Label', id: 'some-id' }}
      isBeingDeleted={false}
      onDelete={handleDelete}
    />
  )

  wrapper.find(CloseIcon).simulate('click')

  expect(handleDelete).toHaveBeenCalledWith('some-id')
})

it('should handle an Enter key press on the delete button', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <TagsEditorTag
      value={{ label: 'Some Label', id: 'some-id' }}
      isBeingDeleted={false}
      onDelete={handleDelete}
    />
  )

  wrapper
    .find(CloseIcon)
    .simulate('keyPress', { charCode: browserConstants.ENTER_CHARCODE })

  expect(handleDelete).toHaveBeenCalledWith('some-id')
})

it('should handle an non-Enter key press on the delete button', () => {
  const handleDelete = jest.fn()

  const wrapper = shallow(
    <TagsEditorTag
      value={{ label: 'Some Label', id: 'some-id' }}
      isBeingDeleted={false}
      onDelete={handleDelete}
    />
  )

  wrapper
    .find(CloseIcon)
    .simulate('keyPress', { charCode: browserConstants.ENTER_CHARCODE + 1 })

  expect(handleDelete).not.toHaveBeenCalled()
})
