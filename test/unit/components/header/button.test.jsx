import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import HeaderButton from '_src/components/header/button'

it('should render correctly', () => {
  const wrapper = shallow(
    <HeaderButton
      label='The Label'
      ariaHaspopup
      onClick={_.noop}
      onKeyDown={_.noop}
      onKeyPress={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
