import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TimeGridRow from './grid-row'

it('should render correctly with a time', () => {
  const wrapper = shallow(
    <TimeGridRow keyId='some-key' day='Monday' time='23:00' onDelete={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with a times range', () => {
  const wrapper = shallow(
    <TimeGridRow
      keyId='some-key'
      day='Monday'
      timesRange='22:00'
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with audience tags', () => {
  const wrapper = shallow(
    <TimeGridRow
      keyId='some-key'
      day='Monday'
      time='23:00'
      audienceTags={[{ id: 'tag-id', label: 'Tag Label' }]}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
