import React from 'react'
import _ from 'lodash'

import TalentDetail from './talent-detail'
import { FullTalent } from '_src/entities/talent'

it('should render correctly', () => {
  const talent = new FullTalent({
    firstNames: 'First',
    lastName: 'Last',
    images: []
  })

  const wrapper = shallow(<TalentDetail entity={talent} />)

  expect(wrapper).toMatchSnapshot()
})
