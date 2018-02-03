import React from 'react'
import { shallow } from 'enzyme'

import EntityCardCollection from '_src/components/entity-card/collection'
import { SummaryVenue } from '_src/entities/venue'

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <EntityCardCollection
      entities={[new SummaryVenue({ id: 'some-venue-id' })]}
      getInProgress
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
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
      entities={[]}
      getInProgress={false}
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})