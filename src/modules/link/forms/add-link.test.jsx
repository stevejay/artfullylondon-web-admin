import React from 'react'
import _ from 'lodash'

import { AddLinkForm } from './add-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <AddLinkForm
      pristine
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      reset={_.noop}
      linkTypeOptions={[]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
