import React from 'react'

import { SummaryTalent } from '_src/entities/talent'
import TalentCardContent from './talent-card-content'

it('should render correctly', () => {
  const entity = new SummaryTalent({
    id: 'some-id',
    name: 'Some Name',
    commonRole: 'Actor'
  })

  const wrapper = shallow(<TalentCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
