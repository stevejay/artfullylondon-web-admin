import React from 'react'
import _ from 'lodash'

import TimesField from './times-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <TimesField
      label='The Label'
      input={{ value: [{ key: 'some-key' }], onChange: _.noop }}
      meta={{ touched: false, error: null }}
      formComponent={() => 'div'}
      itemComponent={() => 'span'}
      constraint={{}}
      parentFormName='TheParentFormName'
      timesRangesOptions={[]}
      minDate='2016/01/18'
      maxDate='2017/01/18'
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = [{ key: 'some-key' }]
    const timesRangesOptions = []

    const wrapper = shallow(
      <TimesField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
        formComponent={() => 'div'}
        itemComponent={() => 'span'}
        constraint={{}}
        parentFormName='TheParentFormName'
        timesRangesOptions={timesRangesOptions}
        minDate='2016/01/18'
        maxDate='2017/01/18'
        onSubmit={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null },
      timesRangesOptions
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = [{ key: 'some-key' }]
    const timesRangesOptions = []

    const wrapper = shallow(
      <TimesField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
        formComponent={() => 'div'}
        itemComponent={() => 'span'}
        constraint={{}}
        parentFormName='TheParentFormName'
        timesRangesOptions={timesRangesOptions}
        minDate='2016/01/18'
        maxDate='2017/01/18'
        onSubmit={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: true, error: null },
      timesRangesOptions
    })

    expect(result).toEqual(true)
  })
})

it('should handle submitting the form', () => {
  const handleSubmit = jest.fn()

  const wrapper = shallow(
    <TimesField
      label='The Label'
      input={{ value: [{ key: 'some-key' }], onChange: _.noop }}
      meta={{ touched: false, error: null }}
      formComponent={() => 'div'}
      itemComponent={() => 'span'}
      constraint={{}}
      parentFormName='TheParentFormName'
      timesRangesOptions={[]}
      minDate='2016/01/18'
      maxDate='2017/01/18'
      onSubmit={handleSubmit}
    />
  )

  wrapper.find('formComponent').simulate('submit', { foo: 'bar' })

  expect(handleSubmit).toHaveBeenCalledWith({ foo: 'bar' }, 'TheParentFormName')
})

it('should handle deleting a time', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <TimesField
      label='The Label'
      input={{
        value: [{ key: 'key-a' }, { key: 'key-b' }],
        onChange: handleChange
      }}
      meta={{ touched: false, error: null }}
      formComponent={() => 'div'}
      itemComponent={() => 'span'}
      constraint={{}}
      parentFormName='TheParentFormName'
      timesRangesOptions={[]}
      minDate='2016/01/18'
      maxDate='2017/01/18'
      onSubmit={_.noop}
    />
  )

  wrapper.find('itemComponent').at(0).simulate('delete', 'key-a')

  expect(handleChange).toHaveBeenCalledWith([{ key: 'key-b' }])
})
