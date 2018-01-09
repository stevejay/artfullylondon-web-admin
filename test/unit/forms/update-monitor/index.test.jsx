import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { UpdateMonitorForm } from '_src/containers/forms/update-monitor'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateMonitorForm
      initialValues={{ hasChanged: true, changeDiff: 'some diff' }}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
