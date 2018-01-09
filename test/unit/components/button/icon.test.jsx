import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import CloseIcon from 'react-icons/lib/fa/close'

import IconButton from '_admin/components/button/icon'

it('should render a default icon button correctly', () => {
  const wrapper = shallow(<IconButton icon={CloseIcon} onClick={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render an inverse icon button correctly', () => {
  const wrapper = shallow(
    <IconButton type='inverse' icon={CloseIcon} onClick={_.noop} />
  )
  expect(wrapper).toMatchSnapshot()
})

it('should render icon button that is aria-expanded correctly', () => {
  const wrapper = shallow(
    <IconButton ariaExpanded icon={CloseIcon} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
