import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { Quicksearch } from '_src/modules/quicksearch'

it('should render correctly', () => {
  const wrapper = shallow(
    <Quicksearch
      show
      pushBasicSearchToUrl={_.noop}
      hideQuicksearch={_.noop}
      clearAutocomplete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
