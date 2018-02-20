import React from 'react'
import _ from 'lodash'

import { MonitorCollection } from './collection'
import UpdateMonitorForm from '../forms/update-monitor'
import Button from '_src/shared/components/button'
import Modal from '_src/shared/components/modal'

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[]}
      getInProgress
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get in not in progress and there are no monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing ignored monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing ignored monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a monitor', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={{ key: 'key-2', isIgnored: false }}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle showing the hidden monitors', () => {
  const toggleShowIgnored = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={toggleShowIgnored}
      setEditingMonitorTo={_.noop}
    />
  )

  wrapper.find(Button).simulate('click')

  expect(toggleShowIgnored).toHaveBeenCalled()
})

it('should handle editing a monitor', () => {
  const setEditingMonitorTo = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={setEditingMonitorTo}
    />
  )

  wrapper.find('gridRowComponent').prop('onEdit')({ id: 'some-monitor' })

  expect(setEditingMonitorTo).toHaveBeenCalledWith({ id: 'some-monitor' })
})

it('should handle hiding editing a monitor', () => {
  const setEditingMonitorTo = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={setEditingMonitorTo}
    />
  )

  wrapper.find(Modal).prop('onHide')({ id: 'some-monitor' })

  expect(setEditingMonitorTo).toHaveBeenCalledWith(null)
})

it('should handle submitting a edited monitor', () => {
  const onSubmit = jest.fn().mockReturnValue({ then: func => func() })
  const setEditingMonitorTo = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venueHomepageUrl='/some/url'
      monitors={[
        { key: 'key-1', isIgnored: true },
        { key: 'key-2', isIgnored: false }
      ]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={onSubmit}
      toggleShowIgnored={_.noop}
      setEditingMonitorTo={setEditingMonitorTo}
    />
  )

  wrapper.find(UpdateMonitorForm).prop('onSubmit')({ id: 'some-monitor' })

  expect(onSubmit).toHaveBeenCalledWith({ id: 'some-monitor' })
  expect(setEditingMonitorTo).toHaveBeenCalledWith(null)
})
