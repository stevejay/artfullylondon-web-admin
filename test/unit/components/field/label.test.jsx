import React from 'react'
import { shallow } from 'enzyme'

import FieldLabel from '_admin/components/field/label'

it('should render correctly with a tooltip', () => {
  const wrapper = shallow(
    <FieldLabel
      htmlFor='some-id'
      tooltip='The Tooltip'
      error={null}
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldLabel>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no tooltip', () => {
  const wrapper = shallow(
    <FieldLabel
      htmlFor='some-id'
      error={null}
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldLabel>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <FieldLabel
      htmlFor='some-id'
      error='The Error'
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldLabel>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when required', () => {
  const wrapper = shallow(
    <FieldLabel htmlFor='some-id' error={null} required disabled={false}>
      <div id='child' />
    </FieldLabel>
  )

  expect(wrapper).toMatchSnapshot()
})
