import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { Routes } from '_src/routes'

it('should render correctly', () => {
  const wrapper = shallow(
    <Routes dispatch={_.noop} location={{ pathname: '/some/path' }} />
  )

  expect(wrapper).toMatchSnapshot()
})
