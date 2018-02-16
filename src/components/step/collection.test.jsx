import React from 'react'
import _ from 'lodash'

import StepCollection from './collection'

it('should render correctly', () => {
  const wrapper = shallow(
    <StepCollection
      steps={[
        { page: 1, title: 'Page 1 Title' },
        { page: 2, title: 'Page 2 Title' },
        { page: 3, title: 'Page 3 Title' }
      ]}
      currentPage={2}
      onStepClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
