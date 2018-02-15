import React from 'react'

import { FullVenue } from '_src/entities/venue'
import EntityWeSay from './we-say'

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

it('should not update', () => {
  const wrapper = shallow(<EntityWeSay entity={new FullVenue({})} />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
