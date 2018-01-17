import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ModalContainer from '_src/components/modal/container'

it('should render a narrow container correctly', () => {
  const wrapper = shallow(
    <ModalContainer type='narrow' title='The Title' dismissable onHide={_.noop}>
      <div id='child' />
    </ModalContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a non-dismissable container correctly', () => {
  const wrapper = shallow(
    <ModalContainer
      type='narrow'
      title='The Title'
      dismissable={false}
      onHide={_.noop}
    >
      <div id='child' />
    </ModalContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a wide container correctly', () => {
  const wrapper = shallow(
    <ModalContainer type='wide' title='The Title' dismissable onHide={_.noop}>
      <div id='child' />
    </ModalContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
