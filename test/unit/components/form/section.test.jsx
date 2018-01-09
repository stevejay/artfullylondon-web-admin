import React from 'react'
import { shallow } from 'enzyme'

import FormSection from '_admin/components/form/section'

it('should render a narrow section correctly', () => {
  const wrapper = shallow(
    <FormSection type='narrow'><div id='child' /></FormSection>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a wide section correctly', () => {
  const wrapper = shallow(
    <FormSection type='wide'><div id='child' /></FormSection>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a very wide section correctly', () => {
  const wrapper = shallow(
    <FormSection type='verywide'><div id='child' /></FormSection>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a full section correctly', () => {
  const wrapper = shallow(
    <FormSection type='full'><div id='child' /></FormSection>
  )

  expect(wrapper).toMatchSnapshot()
})
