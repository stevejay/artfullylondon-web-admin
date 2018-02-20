import React from 'react'
import ReactSelect from 'react-select'
import _ from 'lodash'

import Select from '_src/shared/components/select'

it('should render correctly', () => {
  const wrapper = shallow(
    <Select
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
    <Select
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
    <Select
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

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const options = [{ value: 'a', label: 'A' }]

    const wrapper = shallow(
      <Select
        name='The Name'
        value='term'
        options={options}
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

    const result = wrapper.instance().shouldComponentUpdate({
      value: 'term',
      error: null,
      touched: false,
      disabled: false,
      options
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <Select
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

    const result = wrapper.instance().shouldComponentUpdate({
      value: 'term',
      error: null,
      touched: false,
      disabled: false,
      options: []
    })

    expect(result).toEqual(true)
  })
})

it('should handle an option being selected when the select is not a multiselect', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <Select
      name='The Name'
      value='term'
      options={[{ value: 'a', label: 'A' }]}
      onChange={handleChange}
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

  wrapper.find(ReactSelect).simulate('change', { value: 'a', label: 'A' })

  expect(handleChange).toHaveBeenCalledWith('a')
})

it('should handle an option being selected when the select is a multiselect', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <Select
      name='The Name'
      value='term'
      options={[{ value: 'a', label: 'A' }]}
      onChange={handleChange}
      valueKey='value'
      labelKey='label'
      htmlId='some-id'
      error={null}
      touched={false}
      disabled={false}
      searchable={false}
      multi
      simpleValue={false}
    />
  )

  wrapper.find(ReactSelect).simulate('change', { value: 'a', label: 'A' })

  expect(handleChange).toHaveBeenCalledWith({ value: 'a', label: 'A' })
})
