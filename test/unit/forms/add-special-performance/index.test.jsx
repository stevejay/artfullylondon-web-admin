import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  AddSpecialPerformanceForm
} from '_src/containers/forms/add-special-performance'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddSpecialPerformanceForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      error={null}
      minDate='2017/01/18'
      maxDate='2017/09/18'
      showModal={_.noop}
      audienceTags={[
        {
          id: 'tag-id',
          label: 'Tag Label'
        }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
