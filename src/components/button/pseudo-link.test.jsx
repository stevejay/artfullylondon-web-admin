import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import PseudoLinkButton from '_src/components/button/pseudo-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <PseudoLinkButton onClick={_.noop}>
      <div id='child' />{' '}
    </PseudoLinkButton>
  )

  expect(wrapper).toMatchSnapshot()
})
