import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import MapField from '_src/components/map/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <MapField
      label='The Label'
      input={{
        value: {
          lat: 11,
          lng: 22
        },
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      defaultCenter={{
        lat: 33,
        lng: 44
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
