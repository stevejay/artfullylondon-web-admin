import React from 'react'
import _ from 'lodash'

import { AddAdditionalPerformanceForm } from './add-additional-performance'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddAdditionalPerformanceForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      minDate='2018/01/01'
      maxDate='2018/02/01'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
