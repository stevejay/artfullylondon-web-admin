import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TextField from '_admin/components/text/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
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

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <TextField
      label='The Label'
      tooltip='The Tooltip'
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: true,
        error: 'The Error'
      }}
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
