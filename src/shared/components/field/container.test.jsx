import React from 'react'

import FieldContainer from '_src/shared/components/field/container'

it('should render correctly', () => {
  const wrapper = shallow(
    <FieldContainer
      htmlFor='some-id'
      label='The Label'
      tooltip='The Tooltip'
      error={null}
      touched={false}
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <FieldContainer
      htmlFor='some-id'
      label='The Label'
      tooltip='The Tooltip'
      error={null}
      touched={false}
      required={false}
      disabled
    >
      <div id='child' />
    </FieldContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no label', () => {
  const wrapper = shallow(
    <FieldContainer
      htmlFor='some-id'
      tooltip='The Tooltip'
      error={null}
      touched={false}
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not touched and with an error', () => {
  const wrapper = shallow(
    <FieldContainer
      htmlFor='some-id'
      label='The Label'
      tooltip='The Tooltip'
      error='Some Error'
      touched={false}
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when touched and with an error', () => {
  const wrapper = shallow(
    <FieldContainer
      htmlFor='some-id'
      label='The Label'
      tooltip='The Tooltip'
      error='Some Error'
      touched
      required={false}
      disabled={false}
    >
      <div id='child' />
    </FieldContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
