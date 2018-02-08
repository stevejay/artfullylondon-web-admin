import React from 'react'
import _ from 'lodash'

import { AddPerformanceForm } from './add-performance'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddPerformanceForm
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
