import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import FormButtons from '_src/components/form/buttons'

it('should render correctly when has previous button', () => {
  const wrapper = shallow(
    <FormButtons
      submitting={false}
      submitLabel='Submitting'
      onPrevious={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has cancel button', () => {
  const wrapper = shallow(
    <FormButtons
      submitting={false}
      submitLabel='Submitting'
      onCancel={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not submitting', () => {
  const wrapper = shallow(
    <FormButtons submitting={false} submitLabel='Submitting' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when submitting', () => {
  const wrapper = shallow(<FormButtons submitting submitLabel='Submitting' />)
  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <FormButtons submitting={false} submitLabel='Submitting' />
    )

    const result = wrapper
      .instance()
      .shouldComponentUpdate({ submitting: false })
    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <FormButtons submitting={false} submitLabel='Submitting' />
    )

    const result = wrapper
      .instance()
      .shouldComponentUpdate({ submitting: true })
    expect(result).toEqual(true)
  })
})
