import React from 'react'
import _ from 'lodash'

import { EntitySelectorSearch } from './entity-selector-search'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={entityType.TALENT}
      inputValue='Some value'
      setInputValue={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
