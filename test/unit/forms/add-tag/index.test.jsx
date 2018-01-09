import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { AddTagForm } from '_src/containers/forms/add-tag'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddTagForm
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      submitSucceeded={false}
      tagType='medium'
      initialValues={{
        label: 'The Label',
        tagType: 'medium',
        addTagForEvent: false
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
