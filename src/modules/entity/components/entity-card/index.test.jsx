import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EntityCard from './index'
import { SummaryVenue } from '_src/entities/venue'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCard
      entity={new SummaryVenue({ id: 'some-venue-id' })}
      dateStr='2017/01/18'
      cardContentFactory={() => 'div'}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
