import React from 'react'
import _ from 'lodash'

import { AddSpecialPerformanceForm } from './add-special-performance'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddSpecialPerformanceForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      minDate='2018/01/01'
      maxDate='2018/02/01'
      audienceTags={[{ id: 'audience/family', label: 'family' }]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
