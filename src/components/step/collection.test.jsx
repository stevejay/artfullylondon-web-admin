import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import StepCollection from '_src/components/step/collection'

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
