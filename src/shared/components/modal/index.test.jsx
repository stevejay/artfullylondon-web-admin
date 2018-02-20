import React from 'react'
import _ from 'lodash'

import Modal from '_src/shared/components/modal'

const TestTransition = props => <div id='transition' />

it('should render correctly', () => {
  const wrapper = shallow(
    <Modal show transition={TestTransition} onHide={_.noop}>
      <div id='child' />
    </Modal>
  )

  expect(wrapper).toMatchSnapshot()
})
