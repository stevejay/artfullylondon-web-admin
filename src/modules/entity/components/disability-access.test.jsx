import React from 'react'
import { shallow } from 'enzyme'

import EntityDisabilityAccess from './disability-access'
import * as accessConstants from '_src/constants/access'
import * as accessLib from '_src/lib/access'

it('should render correctly', () => {
  const mockLinks = {
    getLinkByType: jest.fn().mockReturnValue({ url: 'http://some/link' })
  }

  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(
    <EntityDisabilityAccess
      wheelchairAccessType={accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS}
      disabledBathroomType={accessConstants.DISABLED_BATHROOM_TYPE_PRESENT}
      hearingFacilitiesType={
        accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
      }
      links={mockLinks}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no disability link', () => {
  const mockLinks = { getLinkByType: jest.fn().mockReturnValue(null) }
  accessLib.getAccessText = jest.fn().mockReturnValue('The Access Text')

  const wrapper = shallow(
    <EntityDisabilityAccess
      wheelchairAccessType={accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS}
      disabledBathroomType={accessConstants.DISABLED_BATHROOM_TYPE_PRESENT}
      hearingFacilitiesType={
        accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
      }
      links={mockLinks}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const mockLinks = { getLinkByType: jest.fn().mockReturnValue(null) }
  accessLib.getAccessText = jest.fn().mockReturnValue('')

  const wrapper = shallow(
    <EntityDisabilityAccess
      wheelchairAccessType={accessConstants.WHEELCHAIR_ACCESS_TYPE_FULL_ACCESS}
      disabledBathroomType={accessConstants.DISABLED_BATHROOM_TYPE_PRESENT}
      hearingFacilitiesType={
        accessConstants.HEARING_FACILITIES_TYPE_HEARING_LOOPS
      }
      links={mockLinks}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
