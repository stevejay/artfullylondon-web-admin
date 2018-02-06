import React from 'react'

import TalentDetail from './talent-detail'
import { FullTalent } from '_src/entities/talent'

it('should render correctly', () => {
  const wrapper = shallow(
    <TalentDetail entity={new FullTalent({ lastName: 'Some Name' })} />
  )

  expect(wrapper).toMatchSnapshot()
})
