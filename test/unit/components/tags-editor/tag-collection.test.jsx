import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TagsEditorTagCollection
  from '_src/components/tags-editor/tag-collection'

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
