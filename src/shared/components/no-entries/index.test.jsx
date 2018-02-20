import React from 'react'

import NoEntries from '_src/shared/components/no-entries'

it('should render correctly with the default message', () => {
  const wrapper = shallow(<NoEntries />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with a custom message', () => {
  const wrapper = shallow(<NoEntries message='Custom' />)
  expect(wrapper).toMatchSnapshot()
})
