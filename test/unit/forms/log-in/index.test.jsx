import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LogInForm } from '_src/containers/forms/log-in'

it('should render correctly', () => {
  const wrapper = shallow(
    <LogInForm
      initialValues={{}}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      constraint={{
        username: { length: { maximum: 10 } },
        password: { length: { maximum: 20 } }
      }}
      error={null}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
