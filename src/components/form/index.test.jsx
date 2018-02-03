import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Form from '_src/components/form'

it('should render correctly', () => {
  const wrapper = shallow(
    <Form onSubmit={_.noop}>
      <div id='child' />
    </Form>
  )

  expect(wrapper).toMatchSnapshot()
})
