import React from 'react'
import _ from 'lodash'

import { EditEventSeriesForm } from './edit-event-series'

it('should render correctly when editing', () => {
  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating', () => {
  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit={false}
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
