import React from 'react'
import _ from 'lodash'

import IconButton from '_src/components/button/icon'
import EventMonitorGridRow from './event-monitor-grid-row'

it('should render correctly when has a url', () => {
  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: false,
        inArtfully: true,
        isIgnored: false,
        currentUrl: 'http://some/url',
        combinedEvents: false
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no url', () => {
  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: false,
        inArtfully: true,
        isIgnored: false,
        currentUrl: null,
        combinedEvents: false
      }}
      venueHomepageUrl={null}
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not in artfully', () => {
  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: false,
        inArtfully: false,
        isIgnored: false,
        currentUrl: 'http://some/url',
        combinedEvents: false,
        title: 'Some Title'
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is ignored', () => {
  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: false,
        inArtfully: true,
        isIgnored: true,
        currentUrl: 'http://some/url',
        combinedEvents: false,
        title: 'Some Title'
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has changed', () => {
  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: true,
        inArtfully: true,
        isIgnored: false,
        currentUrl: 'http://some/url',
        combinedEvents: false,
        title: 'Some Title'
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle an edit click', () => {
  const handleEdit = jest.fn()

  const wrapper = shallow(
    <EventMonitorGridRow
      monitor={{
        externalEventId: 'some-external-event-id',
        hasChanged: false,
        inArtfully: true,
        isIgnored: false,
        currentUrl: 'http://some/url',
        combinedEvents: false
      }}
      venueHomepageUrl='http://some/venue/homepage/url'
      onEdit={handleEdit}
    />
  )

  wrapper.find(IconButton).simulate('click')

  expect(handleEdit).toHaveBeenCalledWith({
    combinedEvents: false,
    currentUrl: 'http://some/url',
    externalEventId: 'some-external-event-id',
    hasChanged: false,
    inArtfully: true,
    isIgnored: false
  })
})
