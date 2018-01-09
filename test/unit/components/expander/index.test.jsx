import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Expander from '_admin/components/expander'

it('should render correctly when closed', () => {
  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={_.noop}
      interestingContent
    >
      <div id='child' />
    </Expander>
  )

  expect(wrapper).toMatchSnapshot()
})
