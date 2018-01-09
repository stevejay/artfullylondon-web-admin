import React from 'react'
import { shallow } from 'enzyme'

import { FullVenue } from '_admin/entities/venue'
import EntityDescription from '_admin/components/entity/description'

it('should render correctly', () => {
  const mockEntity = new FullVenue({})
  mockEntity.getLinkByType = jest.fn().mockReturnValue('https://wikipedia/link')

  mockEntity.createFormattedDescription = jest
    .fn()
    .mockReturnValue('Some description.')

  const wrapper = shallow(<EntityDescription entity={mockEntity} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no wikipedia link', () => {
  const mockEntity = new FullVenue({})
  mockEntity.getLinkByType = jest.fn().mockReturnValue(null)

  mockEntity.createFormattedDescription = jest
    .fn()
    .mockReturnValue('Some description.')

  const wrapper = shallow(<EntityDescription entity={mockEntity} />)

  expect(wrapper).toMatchSnapshot()
})
