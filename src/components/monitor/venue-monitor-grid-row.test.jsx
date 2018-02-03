import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import VenueMonitorGridRow
  from '_src/components/monitor/venue-monitor-grid-row'

it('should render correctly when has not changed', () => {
  const wrapper = shallow(
    <VenueMonitorGridRow
      monitor={{
        hasChanged: false,
        isIgnored: false
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no url', () => {
  const wrapper = shallow(
    <VenueMonitorGridRow
      monitor={{
        hasChanged: false,
        isIgnored: false
      }}
      venueHomepageUrl={null}
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has changed', () => {
  const wrapper = shallow(
    <VenueMonitorGridRow
      monitor={{
        hasChanged: true,
        isIgnored: false
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is ignored', () => {
  const wrapper = shallow(
    <VenueMonitorGridRow
      monitor={{
        hasChanged: false,
        isIgnored: true
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
