import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import AddTagModal from '_src/containers/modals/add-tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddTagModal
      onHide={_.noop}
      onSubmit={_.noop}
      tagType='medium'
      title='Some Title'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
