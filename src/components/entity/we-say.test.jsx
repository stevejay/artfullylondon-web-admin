import React from 'react'
import { shallow } from 'enzyme'

import { FullVenue } from '_src/entities/venue'
import EntityWeSay from '_src/components/entity/we-say'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityWeSay entity={new FullVenue({ weSay: 'What we say' })} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no weSay content', () => {
  const wrapper = shallow(<EntityWeSay entity={new FullVenue({})} />)
  expect(wrapper).toMatchSnapshot()
})
