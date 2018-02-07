import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  AddOpeningTimeClosureForm
} from '_src/containers/forms/add-opening-time-closure'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddOpeningTimeClosureForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      error={null}
      minDate='2017/01/18'
      maxDate='2017/09/18'
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
