import React from 'react'

import EntityDisabilityAccess from './disability-access'
import * as accessConstants from '_src/constants/access'
import * as accessLib from '_src/lib/access'
import { FullVenue } from '_src/entities/venue'

it('should render correctly', () => {
  const entity = new FullVenue({
    wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
    disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
    hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
  })

  entity.getLinkByType = jest.fn().mockReturnValue({ url: 'http://some/link' })
  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(<EntityDisabilityAccess entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no disability link', () => {
  const entity = new FullVenue({
    wheelchairAccessType: accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS,
    disabledBathroomType: accessConstants.DISABLED_BATHROOM_TYPE_PRESENT,
    hearingFacilitiesType: accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
  })

  entity.getLinkByType = jest.fn().mockReturnValue(null)
  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(<EntityDisabilityAccess entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
