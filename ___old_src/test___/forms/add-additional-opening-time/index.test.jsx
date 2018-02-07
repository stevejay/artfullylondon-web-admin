import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  AddAdditionalOpeningTimeForm
} from '_src/containers/forms/add-additional-opening-time'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddAdditionalOpeningTimeForm
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
