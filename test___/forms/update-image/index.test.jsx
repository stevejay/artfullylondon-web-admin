import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { UpdateImageForm } from '_src/containers/forms/update-image'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateImageForm
      initialValues={{ copyright: 'The Initial Copyright' }}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      formData={{ copyright: 'The Copyright' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
