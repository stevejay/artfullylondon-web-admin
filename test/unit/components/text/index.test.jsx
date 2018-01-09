import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Text from '_admin/components/text'

it('should render correctly', () => {
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
      password={false}
      autos={false}
      forceSingleLine={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
