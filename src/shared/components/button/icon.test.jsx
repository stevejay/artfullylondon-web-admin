import React from 'react'
import _ from 'lodash'
import CloseIcon from 'react-icons/lib/fa/close'

import IconButton from '_src/shared/components/button/icon'
import * as globalConstants from '_src/shared/constants'

it('should render a default icon button correctly', () => {
  const wrapper = shallow(<IconButton icon={CloseIcon} onClick={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render an inverse icon button correctly', () => {
  const wrapper = shallow(
    <IconButton type='inverse' icon={CloseIcon} onClick={_.noop} />
  )
  expect(wrapper).toMatchSnapshot()
})

it('should render icon button that is aria-expanded correctly', () => {
  const wrapper = shallow(
    <IconButton ariaExpanded icon={CloseIcon} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the button being clicked', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(<IconButton icon={CloseIcon} onClick={handleClick} />)

  wrapper.find('button').simulate('click', {
    preventDefault: jest.fn()
  })

  expect(handleClick).toHaveBeenCalled()
})

it('should handle the Enter key being pressed', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(<IconButton icon={CloseIcon} onClick={handleClick} />)

  wrapper.find('button').simulate('keyPress', {
    charCode: globalConstants.ENTER_CHARCODE
  })

  expect(handleClick).toHaveBeenCalled()
})

it('should handle a non-Enter key being pressed', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(<IconButton icon={CloseIcon} onClick={handleClick} />)

  wrapper.find('button').simulate('keyPress', {
    charCode: globalConstants.ENTER_CHARCODE + 1
  })

  expect(handleClick).not.toHaveBeenCalled()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <IconButton ariaExpanded icon={CloseIcon} onClick={_.noop} />
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ ariaExpanded: true })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <IconButton ariaExpanded icon={CloseIcon} onClick={_.noop} />
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ ariaExpanded: false })

  expect(result).toEqual(true)
})
