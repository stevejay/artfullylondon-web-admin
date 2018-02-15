import React from 'react'
import _ from 'lodash'

import { AddSpecialOpeningTimeForm } from './add-special-opening-time'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddSpecialOpeningTimeForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      reset={_.noop}
      onSubmit={_.noop}
      minDate='2018/01/01'
      maxDate='2018/02/01'
      audienceTagsOptions={[{ id: 'audience/family', label: 'family' }]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
