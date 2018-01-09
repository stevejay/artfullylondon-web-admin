import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SubFormButtons from '_src/components/form/sub-form-buttons'

it('should render correctly when not submitting', () => {
  const wrapper = shallow(
    <SubFormButtons submitting={false} pristine onSubmit={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when submitting', () => {
  const wrapper = shallow(
    <SubFormButtons submitting pristine={false} onSubmit={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when includes the reset option', () => {
  const wrapper = shallow(
    <SubFormButtons
      submitting={false}
      pristine
      onReset={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when includes the reset option and not pristine', () => {
  const wrapper = shallow(
    <SubFormButtons
      submitting={false}
      pristine={false}
      onReset={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
