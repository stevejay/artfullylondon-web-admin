import React from 'react'
import _ from 'lodash'

import ModalContainer from '_src/components/modal/container'

it('should render correctly', () => {
  const wrapper = shallow(
    <ModalContainer
      type='narrow'
      title='Some Title'
      dismissable
      onHide={_.noop}
    >
      <div id='child' />
    </ModalContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
