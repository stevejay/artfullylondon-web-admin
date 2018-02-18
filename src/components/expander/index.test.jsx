import React from 'react'
import _ from 'lodash'

import * as globalConstants from '_src/constants'
import Expander from '_src/components/expander'

it('should render correctly when closed', () => {
  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={_.noop}
    >
      <div id='child' />
    </Expander>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when closed and has interesting content', () => {
  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={_.noop}
      interestingContent
    >
      <div id='child' />
    </Expander>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when open', () => {
  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open
      onExpanderChange={_.noop}
    >
      <div id='child' />
    </Expander>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when open and has interesting content', () => {
  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open
      onExpanderChange={_.noop}
      interestingContent
    >
      <div id='child' />
    </Expander>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a header click', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onClick')({ preventDefault: _.noop })

  expect(onExpanderChange).toHaveBeenCalledWith('some-id')
})

it('should ignore a non-recognized key press', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onKeyDown')({
    keyCode: 1234
  })

  expect(onExpanderChange).not.toHaveBeenCalled()
})

it('should handle an arrow down press on a closed expander', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onKeyDown')({
    keyCode: globalConstants.ARROW_DOWN_KEYCODE,
    preventDefault: _.noop
  })

  expect(onExpanderChange).toHaveBeenCalledWith('some-id')
})

it('should ignore an arrow down press on an open expander', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onKeyDown')({
    keyCode: globalConstants.ARROW_DOWN_KEYCODE
  })

  expect(onExpanderChange).not.toHaveBeenCalled()
})

it('should handle an arrow up press on an open expander', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onKeyDown')({
    keyCode: globalConstants.ARROW_UP_KEYCODE,
    preventDefault: _.noop
  })

  expect(onExpanderChange).toHaveBeenCalledWith('some-id')
})

it('should ignore an arrow up press on a closed expander', () => {
  const onExpanderChange = jest.fn()

  const wrapper = shallow(
    <Expander
      id='some-id'
      headerText='The Header Text'
      open={false}
      onExpanderChange={onExpanderChange}
    >
      <div id='child' />
    </Expander>
  )

  wrapper.find('button').prop('onKeyDown')({
    keyCode: globalConstants.ARROW_UP_KEYCODE
  })

  expect(onExpanderChange).not.toHaveBeenCalled()
})
