import React from 'react'

import FieldRemainingChars from '_src/components/field/remaining-chars'

it('should render correctly with two remaining chars', () => {
  const wrapper = shallow(
    <FieldRemainingChars active value='AAA' maxLength={5} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not active', () => {
  const wrapper = shallow(
    <FieldRemainingChars active={false} value='AAA' maxLength={5} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with one remaining char', () => {
  const wrapper = shallow(
    <FieldRemainingChars active value='AAAA' maxLength={5} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no remaining chars', () => {
  const wrapper = shallow(
    <FieldRemainingChars active value='AAAAA' maxLength={5} />
  )

  expect(wrapper).toMatchSnapshot()
})
