import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownSearchField from '_src/components/dropdown/search-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DropdownSearchField
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
      valueKey='value'
      labelKey='label'
      htmlId={'some-id'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <DropdownSearchField
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: true,
        error: 'The Error'
      }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
      valueKey='value'
      labelKey='label'
      htmlId={'some-id'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <DropdownSearchField
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      disabled
      searchable={false}
      multi={false}
      simpleValue={false}
      valueKey='value'
      labelKey='label'
      htmlId={'some-id'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
