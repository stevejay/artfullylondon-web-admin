import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Modal from '_src/components/modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <Modal
      show={false}
      modalProps={{
        notDismissable: false,
        name: 'The Name'
      }}
      component='div'
      componentProps={{ foo: 'bar' }}
      onHide={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly where there is no component', () => {
  const wrapper = shallow(
    <Modal
      show
      modalProps={{
        notDismissable: false,
        name: 'The Name'
      }}
      componentProps={{ foo: 'bar' }}
      onHide={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
