import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TextField from '_src/components/text/field'
import Text from '_src/components/text'

it('should render correctly', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      maxLength={50}
      required={false}
      disabled={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
      remainingChars={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has remaining chars', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      maxLength={50}
      required={false}
      disabled={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
      remainingChars
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: true, error: 'The Error' }}
      maxLength={50}
      required={false}
      disabled={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
      remainingChars={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the text input control getting and losing focus', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{ value: 'term', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      maxLength={50}
      required={false}
      disabled={false}
      autoFocus={false}
      placeholder='The Placeholder'
      password={false}
      autos={false}
      forceSingleLine={false}
      remainingChars={false}
    />
  )

  expect(wrapper.state()).toEqual({ active: false })

  wrapper.find(Text).simulate('focus')
  wrapper.update()

  expect(wrapper.state()).toEqual({ active: true })

  wrapper.find(Text).simulate('blur')
  wrapper.update()

  expect(wrapper.state()).toEqual({ active: false })
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <TextField
        label='The Label'
        tooltip='The Tooltip'
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
        maxLength={50}
        required={false}
        disabled={false}
        autoFocus={false}
        placeholder='The Placeholder'
        password={false}
        autos={false}
        forceSingleLine={false}
        remainingChars={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate(
      {
        input: { value: 'term' },
        meta: { touched: false, error: null },
        disabled: false
      },
      { active: false }
    )

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <TextField
        label='The Label'
        tooltip='The Tooltip'
        input={{ value: 'term', onChange: _.noop }}
        meta={{ touched: false, error: null }}
        maxLength={50}
        required={false}
        disabled={false}
        autoFocus={false}
        placeholder='The Placeholder'
        password={false}
        autos={false}
        forceSingleLine={false}
        remainingChars={false}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate(
      {
        input: { value: 'term' },
        meta: { touched: false, error: null },
        disabled: false
      },
      { active: true }
    )

    expect(result).toEqual(true)
  })
})
