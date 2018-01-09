import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { AddPerformanceForm } from '_src/containers/forms/add-performance'

it('should render correctly with times ranges options', () => {
  const wrapper = shallow(
    <AddPerformanceForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      error={null}
      timesRangesOptions={[{ id: 'some-id' }]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no times ranges options', () => {
  const wrapper = shallow(
    <AddPerformanceForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      error={null}
      timesRangesOptions={[]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
