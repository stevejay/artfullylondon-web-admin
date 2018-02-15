import React from 'react'

import OpeningTimesEntry from './entry'
import * as timeLib from '_src/lib/time'

beforeEach(() => {
  timeLib.formatOpeningTimesOrPerformanceTimeForDisplay = jest
    .fn()
    .mockImplementation(arg => arg)
})

it('should render basic times correctly', () => {
  const wrapper = shallow(
    <OpeningTimesEntry
      label='The Label'
      times={['Time 1', 'Time 2']}
      type='basic'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render additional times correctly', () => {
  const wrapper = shallow(
    <OpeningTimesEntry
      label='The Label'
      times={['Time 1', 'Time 2']}
      type='additional'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render special times correctly', () => {
  const wrapper = shallow(
    <OpeningTimesEntry
      label='The Label'
      times={['Time 1', 'Time 2']}
      type='special'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render closure times correctly', () => {
  const wrapper = shallow(
    <OpeningTimesEntry
      label='The Label'
      times={['Time 1', 'Time 2']}
      type='closure'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render no times correctly', () => {
  const wrapper = shallow(
    <OpeningTimesEntry label='The Label' times={[]} type='basic' />
  )

  expect(wrapper).toMatchSnapshot()
})
