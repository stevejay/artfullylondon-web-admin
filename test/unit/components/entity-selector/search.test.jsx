import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { EntitySelectorSearch } from '_src/components/entity-selector/search'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'

it('should render an info bar for a venue correctly', () => {
  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={ENTITY_TYPE_VENUE}
      onSelectEntity={_.noop}
      error={null}
      entitySearchLabel='The Search Label'
      autocompleteItems={[]}
      autocompleteSearch={_.noop}
      clearAutocomplete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
