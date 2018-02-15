import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import PencilIcon from 'react-icons/lib/fa/pencil'

import VenueMonitorGridRow from './venue-monitor-grid-row'

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

it('should handle an edit click', () => {
  const onEdit = jest.fn()

  const wrapper = shallow(
    <VenueMonitorGridRow
      monitor={{
        hasChanged: false,
        isIgnored: false
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={onEdit}
    />
  )

  wrapper.find(PencilIcon).simulate('click')

  expect(onEdit).toHaveBeenCalledWith({
    hasChanged: false,
    isIgnored: false
  })
})
