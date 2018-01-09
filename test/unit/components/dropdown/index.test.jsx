import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Dropdown from '_admin/components/dropdown'

it('should render correctly', () => {
  const wrapper = shallow(
    <Dropdown
      name='The Name'
      value='term'
      options={[{ value: 'a', label: 'A' }]}
      onChange={_.noop}
      valueKey='value'
      labelKey='label'
      htmlId='some-id'
      error={null}
      touched={false}
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <Dropdown
      name='The Name'
      value='term'
      options={[{ value: 'a', label: 'A' }]}
      onChange={_.noop}
      valueKey='value'
      labelKey='label'
      htmlId='some-id'
      error='The Error'
      touched
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <Dropdown
      name='The Name'
      value='term'
      options={[{ value: 'a', label: 'A' }]}
      onChange={_.noop}
      valueKey='value'
      labelKey='label'
      htmlId='some-id'
      error={null}
      touched={false}
      disabled
      searchable={false}
      multi={false}
      simpleValue={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
