import React from 'react'

import EntityDisabilityAccess from './disability-access'
import * as accessLib from '../lib/access'
import wheelchairAccessType from '_src/entities/types/wheelchair-access-type'
import disabledBathroomType from '_src/entities/types/disabled-bathroom-type'
import hearingFacilitiesType from '_src/entities/types/hearing-facilities-type'
import { FullVenue } from '_src/entities/venue'

it('should render correctly', () => {
  const entity = new FullVenue({
    wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
    disabledBathroomType: disabledBathroomType.PRESENT,
    hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS
  })

  entity.getLinkByType = jest.fn().mockReturnValue({ url: 'http://some/link' })
  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(<EntityDisabilityAccess entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no disability link', () => {
  const entity = new FullVenue({
    wheelchairAccessType: wheelchairAccessType.FULL_ACCESS,
    disabledBathroomType: disabledBathroomType.PRESENT,
    hearingFacilitiesType: hearingFacilitiesType.HEARING_LOOPS
  })

  entity.getLinkByType = jest.fn().mockReturnValue(null)
  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(<EntityDisabilityAccess entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
