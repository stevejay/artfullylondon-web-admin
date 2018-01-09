import React from 'react'
import { shallow } from 'enzyme'
import * as accessConstants from '_admin/constants/access'
import EntityDisabilityAccess from '_admin/components/entity/disability-access'
import * as accessLib from '_admin/lib/access'

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
  const mockLinks = {
    getLinkByType: jest.fn().mockReturnValue(null)
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
