import React from 'react'

import SearchInputAutocompleteHeaderItem from './autocomplete-header-item'

it('should render correctly', () => {
  const wrapper = shallow(<SearchInputAutocompleteHeaderItem label='event' />)

  expect(wrapper).toMatchSnapshot()
})
