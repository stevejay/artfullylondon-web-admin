import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { AddImageForm } from '_src/modules/image/forms/add-image-form'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddImageForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})