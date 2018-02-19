import React from 'react'

import TalentDetail from './talent-detail'
import { FullTalent } from '_src/domain/talent'

it('should render correctly', () => {
  const talent = new FullTalent({
    firstNames: 'First',
    lastName: 'Last',
    images: []
  })

  const wrapper = shallow(<TalentDetail entity={talent} />)

  expect(wrapper).toMatchSnapshot()
})
