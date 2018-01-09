import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EntitySelectorField from '_src/components/entity-selector/field'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntitySelectorField
      entityType={ENTITY_TYPE_VENUE}
      label='The Label'
      input={{
        value: { id: 'some-venue-id', name: 'The Venue Name' },
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      required
      getSubEntity={_.noop}
      entityDetailsUrlTemplate='{id}'
      entityDetailsFormatter={_.noop}
      entitySearchLabel='Search Label'
      parentFormName='parent-form-name'
      getEntityInProgress={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no entity', () => {
  const wrapper = shallow(
    <EntitySelectorField
      entityType={ENTITY_TYPE_VENUE}
      label='The Label'
      input={{
        value: {},
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      required
      getSubEntity={_.noop}
      entityDetailsUrlTemplate='{id}'
      entityDetailsFormatter={_.noop}
      entitySearchLabel='Search Label'
      parentFormName='parent-form-name'
      getEntityInProgress={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when in progress', () => {
  const wrapper = shallow(
    <EntitySelectorField
      entityType={ENTITY_TYPE_VENUE}
      label='The Label'
      input={{
        value: { id: 'some-venue-id', name: 'The Venue Name' },
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
      required
      getSubEntity={_.noop}
      entityDetailsUrlTemplate='{id}'
      entityDetailsFormatter={_.noop}
      entitySearchLabel='Search Label'
      parentFormName='parent-form-name'
      getEntityInProgress
    />
  )

  expect(wrapper).toMatchSnapshot()
})
