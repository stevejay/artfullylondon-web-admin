import React from 'react'
import _ from 'lodash'

import { AddOpeningTimeForm } from './add-opening-time'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddOpeningTimeForm
      pristine
      submitting={false}
      timesRangesOptions={[]}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with times ranges', () => {
  const wrapper = shallow(
    <AddOpeningTimeForm
      pristine
      submitting={false}
      timesRangesOptions={[{ value: 1, label: 'A' }]}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
