import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { UpdateImageForm } from '_src/components/images/update-image-form'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateImageForm
      initialValues={{ copyright: 'Some copyright' }}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
