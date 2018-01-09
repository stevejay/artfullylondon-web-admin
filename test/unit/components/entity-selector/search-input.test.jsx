import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EntitySelectorSearchInput
  from '_src/components/entity-selector/search-input'

it('should render an info bar for a venue correctly', () => {
  const wrapper = shallow(
    <EntitySelectorSearchInput
      autocompleteItems={[
        {
          autocompleteItemType: 'entity',
          id: 'some-id',
          name: 'Some Name',
          entityType: 'venue'
        }
      ]}
      onAutocompleteSearch={_.noop}
      onAutocompleteClear={_.noop}
      onAutocompleteResultSelect={_.noop}
      size='small'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
