import React from 'react'

import SearchInputToolbar from './toolbar'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchInputToolbar>
      <div id='child' />
    </SearchInputToolbar>
  )

  expect(wrapper).toMatchSnapshot()
})
