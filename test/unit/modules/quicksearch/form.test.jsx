import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { QuicksearchForm } from '_src/modules/quicksearch/form'

it('should render correctly', () => {
  const wrapper = shallow(
    <QuicksearchForm
      initialValues={{}}
      submitting={false}
      handleSubmit={_.noop}
      onSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
