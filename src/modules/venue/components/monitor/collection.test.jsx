import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { MonitorCollection } from './collection'
import { FullVenue } from '_src/entities/venue'
import UpdateMonitorForm from '_src/modules/venue/forms/update-monitor'
import Button from '_src/components/button'
import Modal from '_src/components/modal'

it('should render correctly when get is in progress', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
      monitors={[]}
      getInProgress
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      setShowIgnored={_.noop}
      setEditingMonitor={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when get in not in progress and there are no monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
      monitors={[]}
      getInProgress={false}
      gridRowComponent={() => 'div'}
      showIgnored={false}
      editingMonitor={null}
      onMounted={_.noop}
      onSubmit={_.noop}
      setShowIgnored={_.noop}
      setEditingMonitor={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing ignored monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing ignored monitors', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a monitor', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle showing the hidden monitors', () => {
  const setShowIgnored = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={setShowIgnored}
      setEditingMonitor={_.noop}
    />
  )

  wrapper.find(Button).simulate('click')

  expect(setShowIgnored).toHaveBeenCalledWith(true)
})

it('should handle editing a monitor', () => {
  const setEditingMonitor = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={setEditingMonitor}
    />
  )

  wrapper.find('gridRowComponent').prop('onEdit')({ id: 'some-monitor' })

  expect(setEditingMonitor).toHaveBeenCalledWith({ id: 'some-monitor' })
})

it('should handle hiding editing a monitor', () => {
  const setEditingMonitor = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={setEditingMonitor}
    />
  )

  wrapper.find(Modal).prop('onHide')({ id: 'some-monitor' })

  expect(setEditingMonitor).toHaveBeenCalledWith(null)
})

it('should handle submitting a edited monitor', () => {
  const onSubmit = jest.fn().mockReturnValue({ then: func => func() })
  const setEditingMonitor = jest.fn()

  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
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
      setShowIgnored={_.noop}
      setEditingMonitor={setEditingMonitor}
    />
  )

  wrapper.find(UpdateMonitorForm).prop('onSubmit')({ id: 'some-monitor' })

  expect(onSubmit).toHaveBeenCalledWith({ id: 'some-monitor' })
  expect(setEditingMonitor).toHaveBeenCalledWith(null)
})
