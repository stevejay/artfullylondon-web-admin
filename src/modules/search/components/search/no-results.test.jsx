import React from 'react'
import _ from 'lodash'

import SearchNoResults from './no-results'
import * as entityConstants from '_src/constants/entity'

it('should render correctly when should suggest searching all', () => {
  const wrapper = shallow(
    <SearchNoResults
      entityType={entityConstants.ENTITY_TYPE_EVENT}
      onTryAllClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should not suggest searching all', () => {
  const wrapper = shallow(
    <SearchNoResults
      entityType={entityConstants.ENTITY_TYPE_ALL}
      onTryAllClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
