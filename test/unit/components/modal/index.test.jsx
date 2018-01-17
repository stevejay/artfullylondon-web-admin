import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Modal from '_src/components/modal'

const TestTransition = props => <div id='transition' />

it('should render correctly', () => {
  const wrapper = shallow(
    <Modal show transition={TestTransition} onHide={_.noop}>
      <div id='child' />
    </Modal>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should ignore update when props have not changed', () => {
  const wrapper = shallow(
    <Modal show transition={TestTransition} onHide={_.noop}>
      <div id='child' />
    </Modal>
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: true })
  expect(result).toEqual(false)
})

it('should trigger update when props have changed', () => {
  const wrapper = shallow(
    <Modal show transition={TestTransition} onHide={_.noop}>
      <div id='child' />
    </Modal>
  )

  const result = wrapper.instance().shouldComponentUpdate({ show: false })
  expect(result).toEqual(true)
})
