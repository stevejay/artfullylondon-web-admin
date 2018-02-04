import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Text from '_src/components/text'

it('should render a single line text input correctly', () => {
  const wrapper = shallow(
    <Text
      value='term'
      maxLength={50}
      id='some-id'
      onChange={_.noop}
      onClick={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
      error={null}
      touched={false}
      disabled={false}
      readOnly={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a single line text input with autos correctly', () => {
  const wrapper = shallow(
    <Text
      value='term'
      maxLength={50}
      id='some-id'
      onChange={_.noop}
      onClick={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
      error={null}
      touched={false}
      disabled={false}
      readOnly={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos
      forceSingleLine={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a multi line text input correctly', () => {
  const wrapper = shallow(
    <Text
      value='term'
      maxLength={1000}
      id='some-id'
      onChange={_.noop}
      onClick={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
      error={null}
      touched={false}
      disabled={false}
      readOnly={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <Text
      value='term'
      maxLength={50}
      id='some-id'
      onChange={_.noop}
      onClick={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
      error='The Error'
      touched
      disabled={false}
      readOnly={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password
      autos={false}
      forceSingleLine={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <Text
        value='term'
        maxLength={50}
        id='some-id'
        onChange={_.noop}
        onClick={_.noop}
        onFocus={_.noop}
        onBlur={_.noop}
        error={null}
        touched={false}
        disabled={false}
        readOnly={false}
        autoFocus={false}
        placeholder='The Placeholder'
        password={false}
        autos={false}
        forceSingleLine={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      value: 'term',
      error: null,
      touched: false,
      disabled: false
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <Text
        value='term'
        maxLength={50}
        id='some-id'
        onChange={_.noop}
        onClick={_.noop}
        onFocus={_.noop}
        onBlur={_.noop}
        error={null}
        touched={false}
        disabled={false}
        readOnly={false}
        autoFocus={false}
        placeholder='The Placeholder'
        password={false}
        autos={false}
        forceSingleLine={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      value: 'term',
      error: null,
      touched: false,
      disabled: true
    })

    expect(result).toEqual(true)
  })
})
