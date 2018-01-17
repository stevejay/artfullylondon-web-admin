import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LoginPage } from '_src/modules/auth/pages/login'

it('should render correctly', () => {
  const wrapper = shallow(
    <LoginPage initialUsername={'steve'} logIn={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
