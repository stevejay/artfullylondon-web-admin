import React from 'react'
import { shallow } from 'enzyme'

import SearchInputToolbar from '_src/components/search-input/toolbar'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchInputToolbar>
      <div id='child' />
    </SearchInputToolbar>
  )

  expect(wrapper).toMatchSnapshot()
})
