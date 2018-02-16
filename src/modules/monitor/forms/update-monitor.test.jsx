import React from 'react'
import _ from 'lodash'

import { UpdateMonitorForm } from './update-monitor'

it('should render correctly when has not changed', () => {
  const wrapper = shallow(
    <UpdateMonitorForm
      initialValues={{ hasChanged: false, changeDiff: 'diff' }}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has changed', () => {
  const wrapper = shallow(
    <UpdateMonitorForm
      initialValues={{ hasChanged: true, changeDiff: 'diff' }}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
