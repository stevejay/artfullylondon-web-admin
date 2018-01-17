import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownButton from '_src/modules/header/components/dropdown/button'

it('should render correctly', () => {
  const wrapper = shallow(
    <DropdownButton
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
