import React from 'react'
import _ from 'lodash'

import FieldResetButton from '_src/components/field/reset-button'
import SelectSearchField from '_src/components/select/search-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <SelectSearchField
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
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
    <SelectSearchField
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: true, error: 'The Error' }}
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
    <SelectSearchField
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
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

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const options = [{ value: 'a', label: 'A' }]

    const wrapper = shallow(
      <SelectSearchField
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
        options={options}
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

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value: 'term' },
      meta: { touched: false, error: null },
      disabled: false,
      options
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <SelectSearchField
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
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

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value: 'term' },
      meta: { touched: false, error: null },
      disabled: false,
      options: []
    })

    expect(result).toEqual(true)
  })
})

it('should handle the reset button being clicked', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <SelectSearchField
      input={{ value: 'term', onChange: handleChange }}
      meta={{ touched: false, error: null }}
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

  wrapper.find(FieldResetButton).simulate('click')

  expect(handleChange).toHaveBeenCalledWith(':all')
})
