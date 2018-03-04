import React from 'react'
import _ from 'lodash'

import EntitySelectorField from './entity-selector-field'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntitySelectorField
      entityType={entityType.TALENT}
      label='The Label'
      input={{
        value: {
          id: 'some-id',
          name: 'Some Name'
        },
        onChange: _.noop
      }}
      meta={{
        touched: false
      }}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
