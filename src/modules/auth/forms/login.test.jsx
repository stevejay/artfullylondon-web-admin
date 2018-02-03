import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LoginForm } from '_src/modules/auth/forms/login'

it('should render correctly', () => {
  const wrapper = shallow(
    <LoginForm
      submitting={false}
      handleSubmit={_.noop}
      constraint={{
        username: { length: { maximum: 100 } },
        password: { length: { maximum: 50 } }
      }}
      onSubmit={_.noop}
      initialValues={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})