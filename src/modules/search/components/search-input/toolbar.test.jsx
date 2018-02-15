import React from 'react'

import SearchInputToolbar from '_src/modules/search/components/search-input/toolbar'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchInputToolbar>
      <div id='child' />
    </SearchInputToolbar>
  )

  expect(wrapper).toMatchSnapshot()
})
