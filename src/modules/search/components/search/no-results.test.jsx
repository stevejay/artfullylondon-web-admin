import React from 'react'
import _ from 'lodash'

import SearchNoResults from './no-results'
import entityType from '_src/entities/types/entity-type'

it('should render correctly when should suggest searching all', () => {
  const wrapper = shallow(
    <SearchNoResults entityType={entityType.EVENT} onTryAllClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should not suggest searching all', () => {
  const wrapper = shallow(
    <SearchNoResults entityType={entityType.ALL} onTryAllClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
