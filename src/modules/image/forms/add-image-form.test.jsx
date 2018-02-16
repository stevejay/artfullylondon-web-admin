import React from 'react'
import _ from 'lodash'

import { AddImageForm } from './add-image-form'

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
