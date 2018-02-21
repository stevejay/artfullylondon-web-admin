import React from 'react'
import _ from 'lodash'

import PseudoLinkButton from '_src/shared/components/button/pseudo-link'
import * as globalConstants from '_src/shared/constants'

it('should render correctly', () => {
  const wrapper = shallow(
    <PseudoLinkButton onClick={_.noop}>
      <div id='child' />
    </PseudoLinkButton>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the button being clicked', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <PseudoLinkButton onClick={handleClick}>
      <div id='child' />
    </PseudoLinkButton>
  )

  wrapper.find('button').simulate('click', {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  })

  expect(handleClick).toHaveBeenCalled()
})

it('should handle the Enter key being pressed', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <PseudoLinkButton onClick={handleClick}>
      <div id='child' />
    </PseudoLinkButton>
  )

  wrapper.find('button').simulate('keyPress', {
    charCode: globalConstants.ENTER_CHARCODE
  })

  expect(handleClick).toHaveBeenCalled()
})

it('should handle a non-Enter key being pressed', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <PseudoLinkButton onClick={handleClick}>
      <div id='child' />
    </PseudoLinkButton>
  )

  wrapper.find('button').simulate('keyPress', {
    charCode: globalConstants.ENTER_CHARCODE + 1
  })

  expect(handleClick).not.toHaveBeenCalled()
})
