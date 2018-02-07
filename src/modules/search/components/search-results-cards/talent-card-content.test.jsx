import React from 'react'
import { shallow } from 'enzyme'

import { SummaryTalent } from '_src/entities/talent'
import TalentCardContent
  from '_src/modules/search/components/search-results-cards/talent-card-content'

it('should render correctly', () => {
  const entity = new SummaryTalent({
    id: 'some-id',
    name: 'Some Name',
    commonRole: 'Actor'
  })

  const wrapper = shallow(<TalentCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
