import React from 'react'

import Statistic from './statistic'
import * as entityLib from '../lib/entity'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  entityLib.getLabelForEntityType = jest.fn().mockReturnValue('The Label')

  const wrapper = shallow(
    <Statistic entityType={entityType.VENUE} count={300} />
  )

  expect(wrapper).toMatchSnapshot()
})
