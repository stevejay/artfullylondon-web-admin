import React from 'react'
import _ from 'lodash'

import EntityCardCollection from './collection'
import { SummaryVenue } from '_src/domain/venue'

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityCardCollection
      entities={[new SummaryVenue({ id: 'some-venue-id' })]}
      getInProgress
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
      onMounted={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are entities', () => {
  const wrapper = shallow(
    <EntityCardCollection
      entities={[new SummaryVenue({ id: 'some-venue-id' })]}
      getInProgress={false}
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are no entities', () => {
  const wrapper = shallow(
    <EntityCardCollection
      entities={null}
      getInProgress={false}
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
