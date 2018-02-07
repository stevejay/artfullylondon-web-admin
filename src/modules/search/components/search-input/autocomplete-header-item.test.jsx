import React from 'react'
import { shallow } from 'enzyme'

import SearchInputAutocompleteHeaderItem
  from '_src/modules/search/components/search-input/autocomplete-header-item'

it('should render correctly', () => {
  const wrapper = shallow(<SearchInputAutocompleteHeaderItem label='event' />)

  expect(wrapper).toMatchSnapshot()
})