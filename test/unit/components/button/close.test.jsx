import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CloseButton from '_src/components/button/close'

it('should render a success close button correctly', () => {
  const wrapper = shallow(
    <CloseButton type='success' ariaLabel='Some label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an error close button correctly', () => {
  const wrapper = shallow(
    <CloseButton type='error' ariaLabel='Some label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a default close button correctly', () => {
  const wrapper = shallow(
    <CloseButton ariaLabel='Some label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
