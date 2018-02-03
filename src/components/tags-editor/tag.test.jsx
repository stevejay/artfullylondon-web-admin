import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TagsEditorTag from '_src/components/tags-editor/tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <TagsEditorTag
      value={{
        label: 'Some Label',
        id: 'some-id'
      }}
      isBeingDeleted={false}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is being deleted', () => {
  const wrapper = shallow(
    <TagsEditorTag
      value={{
        label: 'Some Label',
        id: 'some-id'
      }}
      isBeingDeleted
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
