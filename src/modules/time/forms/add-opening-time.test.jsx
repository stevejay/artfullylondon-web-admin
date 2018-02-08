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
