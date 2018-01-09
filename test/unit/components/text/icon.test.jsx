import React from 'react'
import { shallow } from 'enzyme'
import CloseIcon from 'react-icons/lib/fa/close'

import TextIcon from '_src/components/text/icon'

it('should render correctly with an icon', () => {
  const wrapper = shallow(<TextIcon icon={CloseIcon} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no icon', () => {
  const wrapper = shallow(<TextIcon />)
  expect(wrapper).toMatchSnapshot()
})
