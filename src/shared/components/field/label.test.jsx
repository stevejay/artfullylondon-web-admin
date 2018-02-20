import React from 'react'
import { Overlay } from 'react-overlays'

import FieldLabel from '_src/shared/components/field/label'

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

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <FieldLabel htmlFor='some-id' error={null} required={false} disabled>
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

it('should handle the label being clicked to show the tooltip', () => {
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

  wrapper.find('label').simulate('click')
  wrapper.update() // TODO remove when enzyme bug fixed

  expect(wrapper).toMatchSnapshot()
})

it('should handle closing the tooltip', () => {
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

  wrapper.find('label').simulate('click')
  wrapper.update() // TODO remove when enzyme bug fixed

  expect(wrapper.state()).toEqual({
    showHelp: true,
    ignoreHide: true
  })

  wrapper.find(Overlay).prop('onHide')()
  wrapper.update() // TODO remove when enzyme bug fixed

  expect(wrapper.state()).toEqual({
    showHelp: true,
    ignoreHide: false
  })

  wrapper.find(Overlay).prop('onHide')()
  wrapper.update() // TODO remove when enzyme bug fixed

  expect(wrapper.state()).toEqual({
    showHelp: false,
    ignoreHide: false
  })
})
