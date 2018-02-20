import React from 'react'
import _ from 'lodash'

import SelectField from '_src/shared/components/select/field'

it('should render correctly when has an html id', () => {
  const wrapper = shallow(
    <SelectField
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      required={false}
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

it('should render correctly when has no html id', () => {
  const wrapper = shallow(
    <SelectField
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      required={false}
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
      valueKey='value'
      labelKey='label'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const options = [{ value: 'a', label: 'A' }]

    const wrapper = shallow(
      <SelectField
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
        options={options}
        label='The Label'
        required={false}
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
      <SelectField
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
        options={[{ value: 'a', label: 'A' }]}
        label='The Label'
        required={false}
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
