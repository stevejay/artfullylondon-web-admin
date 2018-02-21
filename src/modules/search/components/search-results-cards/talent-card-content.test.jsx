import React from 'react'

import { SummaryTalent } from '_src/domain/talent'
import TalentCardContent from './talent-card-content'

it('should render correctly', () => {
  const entity = new SummaryTalent({
    id: 'some-id',
    firstNames: 'First',
    lastName: 'Last',
    commonRole: 'Actor'
  })

  const wrapper = shallow(<TalentCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
